import React, { Component }  from 'react';
import { stringsLoginForm }  from './stringsAndConsts/strings.js';
import {TrainingPlan} from './trainingPlan.js';
import {Prompt} from 'react-router-dom';

export class EntryForm extends Component {
  constructor(props) {
  super(props);
  this.state = {
      login: 'Krzychu5',
      email: 'pawellicznerski@poczta.fm',
      errorClass: false,
    };
} //props end

handleRegistrationData = (e) => {
  e.preventDefault();

  if(this.state.login===""||this.state.email===""){
    alert("Żeby się zajerestrować musisz wpisać imię/login i email")
    this.setState({
      errorClass:true,
    })
  } else {
      fetch(`http://localhost:3000/people?login=${this.state.login}&email=${this.state.email}`)
        .then(resp => {
          if (resp.ok) {
            return resp.json()
          } else {
            throw new Error('Błąd sieci!');
          }})
        .then(data => {
          if(data.length===0){
           this.setState({
             errorClass:true,
           })
          } else {
            this.setState({
              errorClass:false,
            })
            const dataFromServer = data[0];
            dataFromServer.newData =false;
            this.loadingTrainingPlanEntry(dataFromServer);
          }
        }); //end of fetch
  };//end of the condition
}//end of handleRegistrationData

loadingTrainingPlanEntry=(dataFromServer)=>{
   this.props.history.push({pathname: `/nowekonto/trainingPlan/${dataFromServer.login}`,
     state: {
       login:dataFromServer.login,
       email:dataFromServer.email,
       weight:dataFromServer.weight,
       height:dataFromServer.height,
       trainingType:dataFromServer.trainingType,
       dateStart:dataFromServer.dateStart,
       dateEnd:dataFromServer.dateEnd,
       numberOfTrainingDays:dataFromServer.numberOfTrainingDays,
       newData:dataFromServer.newData,
     },
   });
} //end of loadingTrainingPlan

handleNameChange=(e)=>{
  this.setState({
    login: e.target.value,
  });
}

handleEmailChange=(e)=>{
  this.setState({
    email: e.target.value,
  });
}

returnToMenu=(e)=>{
  e.preventDefault();
  this.props.history.push('/');
}

render(){
  return (
    <section id="for-entry-bg">

          <div className="form-cnt">
              <div className="entry-text">
                Załaduj swój plan treningowy:
              </div>
                <form onSubmit={this.handleRegistrationData}>
                  <div className="txt-cnt">
                    <div className="form-txt">Login:</div>
                    <label>
                      <input
                      className={this.state.errorClass?"errorClass":null}
                      type="text"
                      value={this.state.login}
                      onChange={this.handleNameChange}
                      placeholder={"login"}
                      />
                    </label>
                    <div className={this.state.errorClass?"errorTextActive":"errorTextNonActive"}>Wpisz prawidłowy login</div>
                  </div>

                  <div className="txt-cnt">
                    <div className="form-txt">E-mail</div>
                    <label>
                      <input
                      type="text"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                      placeholder={"e-mail"}
                      />
                    </label>
                    <div className={this.state.errorClass?"errorTextActive":"errorTextNonActive"}>Wpisz prawidłowy mail</div>
                  </div>
                  <div>

                    <input type="submit" value="Wyświetl trening" />
                  </div>
                </form>
          </div>
          <button className="return-to-menu" onClick={this.returnToMenu}>Powrót do menu</button>
    </section>
    )
  }
}//registration form end
