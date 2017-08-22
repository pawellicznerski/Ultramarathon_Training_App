import React, { Component }  from 'react';
import {  stringsFillInForm, stringsRenderingSuggestions  }  from './stringsAndConsts/strings.js';
import { TrainingPlan } from './trainingPlan.js';
import { HandleRenderingSuggestions } from './fillInFormPartials/renderingSuggestions.js';
import { BrowserRouter as Router,Route,Link,NavLink, Switch, Prompt } from 'react-router-dom';
import { currentDateNumberMinusOneDay, currentDate, currentDateMinusOne  }  from './stringsAndConsts/handleMinDate.js';
import { AreYouSureToGoToTraining }  from './areYouSureToGoToTraining.js';

export class FillInForm extends Component {
  constructor(props) {
  super(props);
  this.state = {
      isBlocking: false,
      login: '',
      email: '',
      weight: '',
      height: '',
      yourExperience:'',
      emptyyourExperienceFieldWarning:"",
      trainingType: '',
      trainingTypeSuggestion: 0,
      dateStart: '',
      emptydateStartFieldWarning:"",
      dateSuggestion:1,
      dateEnd: '',
      emptydateEndFieldWarning:"",
      renderNotEnoughTimeToPrepare: false,
      numberOfTrainingDays:"22",
      renderPromptNumberOfDays: false,
      numberOfChosenTrainingWeeks:'0',
      renderAreYouSureToGoToTraining: false,
      renderMainWarning:false,
      maxKm:"300"
    };
    this.returnToMenu = this.returnToMenu.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegistrationData = this.handleRegistrationData.bind(this);
} //props end

handleRegistrationData =(e)=>{
  e.preventDefault();
  const target = e.target;
  console.log("handleRegistrationData");
  for (var i = 0; i <= (target.length-1); i++) {
    if(target[i].value ===""){
      const name = target[i].name;
      const nameWarning = `empty${name}FieldWarning`;
      const warningString = "Wypełnij puste pole";
      this.setState({
         [nameWarning]:[warningString],
         renderMainWarning:true,
       });
    }
  }
  this.handleloadingTrainingPlan()
}

handleloadingTrainingPlan=()=>{
  this.handleYourExperience();
  this.handleDates();
}

handleYourExperience=()=>{
  if(isNaN(this.state.yourExperience)){
    this.setState({
      emptyyourExperienceFieldWarning: "musisz wybrac jedną z opcji",
      renderMainWarning:true,
    });
   }
}


handleDates=()=>{
  const firstDate = new Date(this.state.dateStart);
  const secondDate = new Date(this.state.dateEnd);
  console.log("dotarło do handle dates");
    if(secondDate<=firstDate ) {
      this.handleIfWrongDate();
    } else if(this.state.renderMainWarning){
      return false;
    } else if(secondDate>firstDate ) {
      const {suggestedValues} = stringsRenderingSuggestions;
      const numberOfTrainingDays2 = (((secondDate-firstDate)+86400000)/86400000);
      this.setState({
        numberOfTrainingDays: numberOfTrainingDays2,
        emptydateStartFieldWarning: "",
        emptydateEndFieldWarning: "",
       });
      if(Math.floor(numberOfTrainingDays2/7) < suggestedValues[this.state.yourExperience][this.state.dateSuggestion]){
         this.setState({
           renderNotEnoughTimeToPrepare: true,
           isBlocking: false,
          });
        window.addEventListener('scroll', this.scrollBlocker);
      } else {
        this.setState({
          isBlocking: false,
          renderAreYouSureToGoToTraining: true,
         });
         window.addEventListener('scroll', this.scrollBlocker);
      }
    }
}
scrollBlocker=(e)=>{
  e.preventDefault();
  window.scrollTo(0,0);
}

handleIfWrongDate=()=>{
  console.log("wrong - druga data jest wczesniejsza");
  this.setState({
    emptydateStartFieldWarning: "druga data nie może być starsza lub taka sam jak pierwsza",
    emptydateEndFieldWarning: "druga data nie może być starsza lub taka sam jak pierwsza",
    renderMainWarning:true,
   });
}//end of handleIfWrongDate


handleDateOnFocus =(e)=>{
  e.preventDefault();
  this.loopForMainWarning();
  this.setState({
    emptydateStartFieldWarning: "",
    emptydateEndFieldWarning: "",
    numberOfChosenTrainingWeeks: "",
   });
   this.loopForMainWarning();
}//end of focus function

loopForMainWarning=()=>{
  //part resposible for rendering main warning in the form
  const dataFieldsNames =[this.state.emptyyourExperienceFieldWarning,this.state.emptyloginFieldWarning,this.state.emptyemailFieldWarning,this.state.emptyweightFieldWarning,this.state.emptyheightFieldWarning,this.state.emptytrainingTypeFieldWarning,this.state.emptydateStartFieldWarning,this.state.emptydateEndFieldWarning];

  for (var i = 0; i < dataFieldsNames.length; i++) {
    console.log(dataFieldsNames[i]);
    if(dataFieldsNames[i]){
      this.setState({
        renderMainWarning:true,
      })
      console.log(dataFieldsNames[i]);
      break;
    } else (
      this.setState({
        renderMainWarning:false,
      })
    )
  }//end of loop
}


handleOnBlur =(e)=>{
  e.preventDefault();
  const name = e.target.name;
  if(name==="login"){
    const blurredFieldData = this.state.login;
    const basicDataFormat = /(?=.*\d)(?=.*[A-Za-z]).{4,15}/;
    const currentWarningBlurText = "Login: 4-15 znaków, min. 1 litera i liczba" ;
    const currentFetchWarningBlurText = "Taki login już istnieje. Podaj inny." ;
    this.handleValidation(name,blurredFieldData,basicDataFormat,currentWarningBlurText,currentFetchWarningBlurText);
  } else if(name==="email"){
    const blurredFieldData = this.state.email;
    const basicDataFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const currentWarningBlurText = stringsFillInForm.emailFormatWarning ;
    const currentFetchWarningBlurText = "Taki email już istnieje. Podaj inny." ;
    this.handleValidation(name,blurredFieldData,basicDataFormat,currentWarningBlurText,currentFetchWarningBlurText);
  } else {
    console.log("złasnie zblurowałeś coś poza login i email");
    console.log(new Date().toJSON().slice(0,10));
    console.log(this.state.dateEnd);
  }
}//end of blur function

handleValidation=(name,blurredFieldData,basicDataFormat,currentWarningBlurText,currentFetchWarningBlurText)=>{
  if(blurredFieldData===""){
    const nameWarning = `empty${name}FieldWarning`;
    this.setState({
      [nameWarning]: `Wpisz ${name}`,
    })
    return false;
  } else if (!basicDataFormat.test(blurredFieldData)) {
    const nameWarning = `empty${name}FieldWarning`;
    this.setState({
      [nameWarning]: currentWarningBlurText,
      renderMainWarning:true,
    })
    return false;
  } else {
    fetch(`http://localhost:3000/people?${name}=${blurredFieldData}`).then(resp => resp.json())
      .then(data => {
        if(data.length!==0){
          // console.log(name);
          // console.log(data);
          // console.log(data.length);
          // console.log("jest w bazie");
          const nameWarning = `empty${name}FieldWarning`;
          this.setState({
            [nameWarning]: currentFetchWarningBlurText,
            renderMainWarning:true,
          })
        } else if (data.length===0){
          console.log("nie ma w bazie");
        }
      });
  }
}; //end of handleValidation

handleOnFocusLogin=(e)=>{
  e.preventDefault();
  this.setState({
    emptyloginFieldWarning: "",
   });
   this.loopForMainWarning();
}

handleOnFocusEmail=(e)=>{
  e.preventDefault();
  this.setState({
    emptyemailFieldWarning: "",
   });
   this.loopForMainWarning();
}

//function which handles all input changes in the form
handleInputChange =(e)=>{
  // e.preventDefault();
  const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;//potrzebne w razie dolączenia checkbox-a
  const name = target.name;
  const nameWarning = `empty${name}FieldWarning`;

  this.setState({
     [name]: value,
     [nameWarning]:'',
     isBlocking: true,
   });
   this.loopForMainWarning();
} //end of handleInputChange

changeSuggestion=(e)=>{
  this.setState({
    emptyyourExperienceFieldWarning: "",
    renderMainWarning:false,
  });
  this.loopForMainWarning();
   if(e.target.id === 'input-1') {
    this.setState({
      yourExperience: 0,
      maxKm:stringsRenderingSuggestions.suggestedValues[0][0],
    });
  } else if(e.target.id === 'input-2') {
    this.setState({
      yourExperience: 1,
      maxKm:stringsRenderingSuggestions.suggestedValues[1][0],
    });
  } else{
    this.setState({
      yourExperience: 2,
      maxKm:stringsRenderingSuggestions.suggestedValues[2][0],
    });
  }
}


//handles btn which return to the home page
returnToMenu=(e)=>{
  e.preventDefault();
  this.props.history.push('/');
}//end of returnToMenu

returnToFillInForm=()=>{
  this.setState({
    renderNotEnoughTimeToPrepare: false,
    renderAreYouSureToGoToTraining: false,
    renderMainWarning:false,
   });
   window.removeEventListener('scroll', this.scrollBlocker);
} //end of returnToFillInForm

loadingTrainingPlan=()=>{
  this.setState({
    renderNotEnoughTimeToPrepare: false,
    renderAreYouSureToGoToTraining: false,
   });
   window.removeEventListener('scroll', this.scrollBlocker);
   const loadingPlanLogin= this.state.login;
   this.props.history.push({pathname: `/nowekonto/trainingPlan/${loadingPlanLogin}`,
     state: {
       login:this.state.login,
       email:this.state.email,
       weight:this.state.weight,
       height:this.state.height,
       trainingType:this.state.trainingType,
       dateStart:this.state.dateStart,
       dateEnd:this.state.dateEnd,
       numberOfTrainingDays:this.state.numberOfTrainingDays,
       newData:true,
     },
   });
} //end of loadingTrainingPlan

showNumberOfWeeks=(e)=>{
  e.preventDefault();
  const firstDate = new Date(this.state.dateStart);
  const secondDate = new Date(this.state.dateEnd);
  const numberOfTrainingDays = ((secondDate-firstDate)/86400000);
  const numberOfChosenTrainingWeeks = Math.floor(numberOfTrainingDays/7)

  if(secondDate<=firstDate||isNaN(numberOfChosenTrainingWeeks)) {
    this.setState({
      emptydateStartFieldWarning: "obie daty musza być wypełnione",
      emptydateEndFieldWarning: "obie daty musza być wypełnione",
      renderMainWarning:true,
     })
  } else {
    this.setState({
      renderPromptNumberOfDays: true,
      numberOfChosenTrainingWeeks: numberOfChosenTrainingWeeks,
     });
  }
}// end of showNumberOfWeeks


render(){
    const {isBlocking} = this.state;
    return (
      <div id="all-cnt" className="col-12">
        <AreYouSureToGoToTraining returnToFillInForm={this.returnToFillInForm} loadingTrainingPlan={this.loadingTrainingPlan} {...this.state}></AreYouSureToGoToTraining>
        <Prompt when={this.state.isBlocking} message={"Niekóre pola sa wypełnione, czy na pewno chcesz wyjść?"}/>
          <div id="fillInForm-cnt">
            <p className="entry-text-FIF">Wypełnij formularz:</p>
            <p className={this.state.renderMainWarning?"main-error-FIF-active":"main-error-FIF-nonactive"}>Wypełnij poprawnie pola i zastosuj sie do sugestii!</p>
          <form onSubmit={this.handleRegistrationData}>
            <div className="inputs-cnts">
              <p className="descr-field">Login:</p>
              <label>
                <input
                  type="text"
                  value={this.state.login}
                  placeholder="Wpisz imie"
                  onChange={this.handleInputChange}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleOnFocusLogin}
                  title="Login musi zawierać między 4 a 15 znaków, chociaż jedną literę i liczbę"
                  name="login"
                />
              </label>
              <p className={this.state.emptyloginFieldWarning?"single-down-error-FIF-active":"single-down-error-FIF-nonactive"}>{this.state.emptyloginFieldWarning}</p>
            </div>

            <div className="inputs-cnts">
              <p className="descr-field">e-mail:</p>
              <label>
                <input
                  type="text"
                  value={this.state.email}
                  placeholder="Wpisz swój e-mail"
                  onChange={this.handleInputChange}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleOnFocusEmail}
                  title="Wpisz prawidłowy adres e-mail"
                  name="email"
                />
              </label>
              <p className={this.state.emptyemailFieldWarning?"single-down-error-FIF-active":"single-down-error-FIF-nonactive"}>{this.state.emptyemailFieldWarning}</p>
            </div>

            <div className="inputs-cnts">
              <p className="descr-field">Twoja waga:</p>
              <label>
                <input
                  type="number"
                  value={this.state.weight}
                  onChange={this.handleInputChange}
                  placeholder="Wpisz wagę"
                  min="30"
                  max="150"
                  pattern="[3-9]/d$"
                  title="Wpisz liczbę od 30 do 150"
                  name="weight"
                />
              </label>
              <p className={this.state.emptyweightFieldWarning?"single-down-error-FIF-active":"single-down-error-FIF-nonactive"}>{this.state.emptyweightFieldWarning}</p>
            </div>

            <div className="inputs-cnts">
              <p className="descr-field">Twój wzrost:</p>
              <label>
                <input
                  type="number"
                  value={this.state.height}
                  onChange={this.handleInputChange}
                  placeholder="Wpisz wzrost"
                  min="130"
                  max="220"
                  pattern="(1[0-5]0)|(1[0-4]/d)|[3-9]/d)$"
                  title="Wpisz liczbę od 130 do 220"
                  name="height"
                />
              </label>
              <p className={this.state.emptyheightFieldWarning?"single-down-error-FIF-active":"single-down-error-FIF-nonactive"}>{this.state.emptyheightFieldWarning}</p>
            </div>

            <div className="select-cnt">
              <p className="descr-select">Wybierz swój poziom zaawansowania:</p>
              <label>
                <div id="select-options-cnt">
                  <p className="options-select">Podstawowy</p>
                  <input type="radio" name="yourExperience" value="0" id="input-1" onClick={this.changeSuggestion} checked={this.state.yourExperience === 0}/>

                  <p className="options-select">Średni</p>
                  <input type="radio" name="yourExperience" value="1" id="input-2" onClick={this.changeSuggestion} checked={this.state.yourExperience === 1}/>

                  <p className="options-select">Zaawansowany</p>
                  <input type="radio" name="yourExperience" value="2" id="input-3" onClick={this.changeSuggestion} checked={this.state.yourExperience === 2}/>
                </div>
              </label>
              <p className={this.state.emptyyourExperienceFieldWarning?"single-down-error-FIF-active":"single-down-error-FIF-nonactive"}>{this.state.emptyyourExperienceFieldWarning}</p>
            </div>

            <div className="inputs-cnts">
              <p className="descr-field">Dystans:</p>
              <label>
                <input
                  value={this.state.trainingType}
                  onChange={this.handleInputChange}
                  name="trainingType"
                  type="number"
                  placeholder="Wpisz dystans ultramaratonu:"
                  min="200"
                  max={this.state.maxKm}
                />
              </label>
            <p className={this.state.emptytrainingTypeFieldWarning?"single-down-error-FIF-active zindex20":"single-down-error-FIF-nonactive"}>{this.state.emptytrainingTypeFieldWarning}</p>
            <HandleRenderingSuggestions yourExperience={this.state.yourExperience} placeOfRendering={this.state.trainingTypeSuggestion}></HandleRenderingSuggestions>
            </div>

            <div className="inputs-cnts">
              <p className="descr-field">Rozpoczęcie:</p>
              <label>
                <input
                type="date"
                value={this.state.dateStart}
                onChange={this.handleInputChange}
                name="dateStart"
                onBlur={this.handleDateOnBlur}
                onFocus={this.handleDateOnFocus}
                min={currentDateMinusOne}
                />
              </label>
            <p className={this.state.emptydateStartFieldWarning?"single-down-error-FIF-active zindex20":"single-down-error-FIF-nonactive"}>{this.state.emptydateStartFieldWarning}</p>
            <HandleRenderingSuggestions yourExperience={this.state.yourExperience} placeOfRendering={this.state.dateSuggestion}></HandleRenderingSuggestions>
            </div>

            <div className="inputs-cnts">
              <p className="descr-field">Szczyt formy:</p>
              <label>
                <input
                type="date"
                value={this.state.dateEnd}
                onChange={this.handleInputChange}
                name="dateEnd"
                onBlur={this.handleDateOnBlur}
                onFocus={this.handleDateOnFocus}
                min={currentDate}
                />
              </label>
            <p className={this.state.emptydateEndFieldWarning?"single-down-error-FIF-active zindex20":"single-down-error-FIF-nonactive"}>{this.state.emptydateEndFieldWarning}</p>
            <HandleRenderingSuggestions yourExperience={this.state.yourExperience} placeOfRendering={this.state.dateSuggestion}></HandleRenderingSuggestions>
            </div>

            <div id="btns-cnt-FIF">
              <div id="weeks-propt">
                <button id="weeks-no-propt-btn" onClick={this.showNumberOfWeeks}>Wyświetl liczbę tygodni:</button><div id="weeks-no-propt">{this.state.numberOfChosenTrainingWeeks}</div>
              </div>
              <button id="render-plan-btn" type="submit">Wyświetl plan</button>
            </div>

          </form>
        </div>
          <button id="returnToMenu-FIF" onClick={this.returnToMenu}>Powrót do menu</button>
      </div>
    )
  }//end of render
}//registration form end
