import React, { Component }  from 'react';
import { stringsTrainingPlan }  from './stringsAndConsts/strings.js';
import {TrainingDay} from './trainingDay.js';
import { Prompt } from 'react-router-dom';
import { MoveToDay } from './trainingPlanPartials/moveToDay';


export class TrainingPlan extends Component {
  constructor(props) {
  super(props);
  this.state = {
      isBlocking: true,
    };
  } //props end

  roundBmi (n, k){
    const factor = Math.pow(10, k);
    return Math.round(n*factor)/factor;
  }

  bmiTip=()=>{
    const {weight,height} = this.props.location.state;
    const bmi = this.roundBmi((weight/(Math.pow((height/100),2))),2);
    const suggestedlowWeight = this.roundBmi(21*(Math.pow((height/100),2)),1);
    const suggestedhighWeight = this.roundBmi(23*(Math.pow((height/100),2)),1);
    const bmiInfo = `Optymalny BMI dla ultramaratonistów jest pomiedzy 21 a 23. Twoj BMI to ${bmi}. Przy wzroscie użytkownika sugerowana waga jest pomiędzy: ${suggestedlowWeight}kg a ${suggestedhighWeight}kg`;
    return bmiInfo;
  }

  makingTrainingPeriods=()=>{
    const {login,email,weight,height,trainingType,dateStart,numberOfTrainingDays,dateEnd}=this.props.location.state;
    const trainingPlanArr=[];
    const dateStartNo = Number(new Date(dateStart));
    const dateStartOnlyFirst = new Date(dateStart).getDay();
    const dateEndOnlyLast = new Date(dateEnd).getDay();
    const howManyDaysAddToFirstWeekArr = [1,0,6,5,4,3,2];
    const numberOfTrainingWeeks = Math.floor(numberOfTrainingDays/7);
    const firstWeekDays = 7+(howManyDaysAddToFirstWeekArr[dateStartOnlyFirst]);
    const firstWeek = Math.ceil(firstWeekDays/7);
    const raceWeekDays = 7+(dateEndOnlyLast);
    const raceWeek = Math.ceil(raceWeekDays/7);
    const noOfTrainWeeksForMain = (numberOfTrainingDays-(firstWeekDays+raceWeekDays))/7;
    const noOfTrainDaysForMain = (numberOfTrainingDays-(firstWeekDays+raceWeekDays));

    for (var i = 0; i < numberOfTrainingDays; i++) {
      const currentDateNo = Math.abs(dateStartNo + (i*86400000));
      const currentDate = new Date(currentDateNo).toJSON().slice(0,10);
      const currentDateDay = new Date(currentDate).getDay();
      trainingPlanArr.push([]);
      trainingPlanArr[i].push(i+1);
      trainingPlanArr[i].push(currentDate);
      const weekday = ["n","pon","wt","śr","czwt","pt","sob"];
      const n = weekday[currentDateDay];
      trainingPlanArr[i].push(n);

      const firstTrainingHalf = (Math.round(noOfTrainWeeksForMain*0.5441));
      const secondTrainingHalf = (Math.round(noOfTrainWeeksForMain-firstTrainingHalf));

      const firstTrainingQuarter = Math.round(firstTrainingHalf*0.4559);
      const secondTrainingQuarter = Math.round(firstTrainingHalf-firstTrainingQuarter);
      const thirdTrainingQuarter = Math.round(secondTrainingHalf*0.7551);
      const fourthTrainingQuarter = Math.round(secondTrainingHalf-thirdTrainingQuarter);

      const stages = ["Podstawowy - wczesny","Podstawowy - późny","Rozbudowy ","Przed startem","Tydzien startowy"];
      const typeOfExercise = ["Test","Regeneracyjny","Wytrzymałość tlenowa","Siła i szybkość","Wytrzymałość siłowa","Wolne","Symulacja ultramaratonu","Wolne lub regeneracyjny"];
      const aerobicEnduraceExerc = ["Długa jazda","Symulacja ultramaratonu"];
      const testExerc = ["Max tempo przez 30 min."];
      const stregthEnduranceExerc = ["Interwał"];
      const muscleStrengthExerc = ["Interwał"];
      const speedExerc = ["Młynek"];
      const regenerationExerc = ['',"Wolna jazda przez"];

      const stage1 = firstWeekDays;
      const stage2 = firstWeekDays+(firstTrainingQuarter*7);
      const stage3 = firstWeekDays+((firstTrainingQuarter+secondTrainingQuarter)*7);
      const stage4 = firstWeekDays+((firstTrainingQuarter+secondTrainingQuarter+thirdTrainingQuarter)*7);
      const stage5 = firstWeekDays+((firstTrainingQuarter+secondTrainingQuarter+thirdTrainingQuarter+fourthTrainingQuarter)*7);
      const stage6 = firstWeekDays+((firstTrainingQuarter+secondTrainingQuarter+thirdTrainingQuarter+fourthTrainingQuarter)*7)+raceWeekDays;

      const regenerationTr = [typeOfExercise[1],regenerationExerc[1],`${Math.round(trainingType*(0.05+(0.005*i)))}km`];
      const breakDay = [typeOfExercise[5],'',''];
      const regeOrBreak = [`${typeOfExercise[5]} lub ${typeOfExercise[1]}`,regenerationExerc[1],`${Math.round(trainingType*(0.05+(0.005*i)))}km`];
      const strengthAndSpeed = [typeOfExercise[3],`${muscleStrengthExerc[0]} i ${speedExerc[0]}`,`Siła:${Math.round(0.15*(0.5*i))}x(${Math.round(0.17*(0.5*i))}x(8-14)cad.) Szybkość:${Math.round(0.15*(0.5*i))}x(${Math.round(0.17*(0.5*i))}x${1+((Math.round(0.17*(0.4*i)))/10)}min)`];
      const aerobicEndTr = [typeOfExercise[2],aerobicEnduraceExerc[0],`Czas:${Math.floor((80+(Math.round(1.428571429*i)))/60)}g${(80+(Math.round(1.428571429*i)))%60}min`];
      const strengthEndTr = [typeOfExercise[4],stregthEnduranceExerc[0],`2x${Math.round(0.67*(0.3*i))}min`];
      const ultraTr = [typeOfExercise[6],aerobicEnduraceExerc[1],`Dystans: ${Math.round((trainingType*0.4)+(trainingType/(stage4/7)*(1.428571429*i)))}`];

      const stageArr1 = [0,regenerationTr,1,breakDay,2,regenerationTr,3,breakDay,4,regenerationTr,5,breakDay,6,regenerationTr,stages[0]];
      const stageArr2 = [0,strengthAndSpeed,1,regeOrBreak,2,aerobicEndTr,3,regeOrBreak,4,strengthAndSpeed,5,regeOrBreak,6,aerobicEndTr,stages[0]];
      const stageArr3 = [0,strengthAndSpeed,1,regeOrBreak,2,aerobicEndTr,3,regeOrBreak ,4,strengthEndTr,5,regeOrBreak,6,aerobicEndTr,stages[1]];
      const stageArr4 = [0,strengthAndSpeed,1,regeOrBreak,2,aerobicEndTr,3,regeOrBreak,4,strengthEndTr,5,regeOrBreak,6,ultraTr,stages[2]];
      const stageArr5 = [0,strengthAndSpeed,1,regeOrBreak,2,aerobicEndTr,3,regeOrBreak,4,strengthEndTr,5,regeOrBreak,6,ultraTr,stages[3]];
      const stageArr6 = [0,regenerationTr,1,breakDay,2,regenerationTr,3,breakDay,4,regenerationTr,5,breakDay,6,regenerationTr,stages[4]];

       var currentStageArr='';
       var currentStage='';

       if(i < stage1){
          currentStageArr = stageArr1;
          currentStage=stage1;
        } else if(i < stage2){
          currentStageArr = stageArr2;
          currentStage=stage2;
        } else if(i < stage3){
          currentStageArr = stageArr3;
          currentStage=stage3;
        } else if(i < stage4){
          currentStageArr = stageArr4;
          currentStage=stage4;
        } else if(i < stage5){
          currentStageArr = stageArr5;
          currentStage=stage5;
        } else if(i < stage6){
          currentStageArr = stageArr6;
          currentStage=stage6;
        }

      if(i < currentStage){
        trainingPlanArr[i].push(currentStageArr[14]);
        for (var j = 0; j < 7; j++) {
          if(currentDateDay===currentStageArr[(2*j)]){
            trainingPlanArr[i].push(currentStageArr[(2*j)+1][0]);
            trainingPlanArr[i].push(currentStageArr[(2*j)+1][1]);
            trainingPlanArr[i].push(currentStageArr[(2*j)+1][2]);
          }
        }
      }
        // console.log(numberOfTrainingWeeksRest);
    }
    return trainingPlanArr;
   } //and of making training periods

  render(){
      return <div className="training-grid">
              <Prompt when={this.state.isBlocking} message={"Jeżeli wyjdziesz wszystkie pola zostana utracone?"}/>
              <MoveToDay data={this.props.location.state}></MoveToDay>
              <TrainingDay trainingPlanArr={this.makingTrainingPeriods()} bmiTip={this.bmiTip()} state={this.props.location.state} history={this.props.history}></TrainingDay>
            </div>
  }//render end
// }//registration form end
};
