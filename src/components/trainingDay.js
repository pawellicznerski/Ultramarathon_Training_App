import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import { SaveInfo } from './saveInfo';
import { ReturnToTopBtn } from './commonPartials/returnToTopBtn';
import { InfoIcon } from './trainingPlanPartials/infoIcon';

export class TrainingDay extends Component {
  constructor(props) {
  super(props);
  this.state = {
      isBlocking: false,
      isBlockingRemove: false,
      saveInfo: false,
      removeInfo: false,
      dataId: '',
    };
  } //props end

renderTrDay=(arr,trainingPlanArr)=> {
  if(trainingPlanArr.length===arr[0]){
    return(
      <div className="training-day" key={arr[0]}>
        <div className="initial-no-cnt"> <p className="lastday">{arr[0]}<span>{arr[2]}</span></p> <p>{arr[1]}</p> </div>
        <div className="decription-cnt">
          <p className="lastdescription">To jest dzień twojego startu. Życzymy powodzenia!</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="training-day" key={arr[0]}>
        <div className="initial-no-cnt"> <p>{arr[0]}<span>{arr[2]}</span></p> <p>{arr[1]}</p> </div>
        <div className="decription-cnt">
          <p><strong>Okres: </strong>{arr[3]}</p>
          <p><strong>Rodzaj: </strong>{arr[4]}</p>
          <p><strong>Typ: </strong>{arr[5]}</p>
          <p><strong>Obciążenie: </strong>{arr[6]}</p>
          <InfoIcon type={arr[4]}></InfoIcon>
        </div>
      </div>
    )
  }
}

loadPDF=()=>{
   this.props.history.push({pathname: `/nowekonto/trainingPlan/${this.props.state.login}/PDF`,
     state: {
       login:this.props.state.login,
       email:this.props.state.email,
       weight:this.props.state.weight,
       height:this.props.state.height,
       trainingType:this.props.state.trainingType,
       dateStart:this.props.state.dateStart,
       dateEnd:this.props.state.dateEnd,
       numberOfTrainingDays:this.props.state.numberOfTrainingDays,
     },
   });
} //end of loadingTrainingPlan

saveAccount=()=>{
  this.scrollBlocker();
  window.addEventListener('scroll', this.scrollBlocker);
  const newMember = this.props.state;
  const nameOfnewMember = this.props.state.login;
  fetch(`http://localhost:3000/people?login=${nameOfnewMember}`).then(resp => resp.json())
    .then(data => {
      if(data.length!==0){
        console.log("blokuje:)");
        this.setState({
          isBlocking:true,
        })
      } else if (data.length===0){
        this.setState({
          saveInfo:true,
        })
        fetch(`http://localhost:3000/people`, {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-My-Header' : 'test'
                  },
                body: JSON.stringify(newMember)
            });
      }
    });
} //end of saveAccount


removeAccount=()=>{
  this.scrollBlocker();
  window.addEventListener('scroll', this.scrollBlocker);
  const newMember = this.props.state;
  const nameOfnewMember = this.props.state.login;

  fetch(`http://localhost:3000/people?login=${nameOfnewMember}`).then(resp => resp.json())
    .then(data => {
      if(data.length!==0){
        const dataId=data[0].id;
        console.log(dataId);
        this.setState({
          removeInfo:true,
          isBlockingRemove:true,
          dataId:dataId,
        })
      } else if(data.length===0){
        alert("dane nie są zapisane")
        this.setState({
          removeDeniedInfo:true,
        })
      }
    });
} //end of removeAccount

removeAccountCondition=()=>{
  fetch(`http://localhost:3000/people/${this.state.dataId}`, {
          method : 'DELETE',
      });
    this.setState({
      isBlockingRemove:false,
    })
    window.removeEventListener('scroll', this.scrollBlocker);
}

closeSaveInfoAndIsblock=()=>{
  this.setState({
    saveInfo:false,
    isBlocking:false,
    removeInfo:false,
    isBlockingRemove:false,
  })
  window.removeEventListener('scroll', this.scrollBlocker);
}

scrollBlocker(){
  window.scrollTo(0,0);
}

render() {
  return (
    <div id="training-plan-bg">
      <div id="training-plan-cnt">
        <ReturnToTopBtn></ReturnToTopBtn>
        <SaveInfo {...this.state} closeSaveInfoAndIsblock={this.closeSaveInfoAndIsblock} removeAccountCondition={this.removeAccountCondition}></SaveInfo>
        <div className="side-btns-td" id="save-btn" onClick={this.saveAccount}>Zapisz</div>
        <div className="side-btns-td" id="remove-tr-btn" onClick={this.removeAccount}>Usuń</div>
        <div id="intro-user-cnt">
          <p id="user-name">Użytkownik: {this.props.state.login}</p>
          <p id="user-bmi">{this.props.bmiTip}</p>
        </div>
        {this.props.trainingPlanArr.map(arr=>this.renderTrDay(arr,this.props.trainingPlanArr))}
      </div>
    </div>
  );
}

}//end of App
