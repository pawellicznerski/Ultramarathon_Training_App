import React, { Component }  from 'react';
import { stringsRenderingSuggestions }  from './stringsAndConsts/strings.js';

export class AreYouSureToGoToTraining extends Component {

  returnToFillInForm=(e)=>{
    e.preventDefault();
    if ( typeof this.props.returnToFillInForm === 'function' ){
        this.props.returnToFillInForm();
    }
  }

  loadingTrainingPlan=(e)=>{
    e.preventDefault();
    if ( typeof this.props.loadingTrainingPlan === 'function' ){
        this.props.loadingTrainingPlan();
    }
  }

  render() {
    const {renderNotEnoughTimeToPrepare,renderAreYouSureToGoToTraining,numberOfTrainingDays,suggestedValues,yourExperience,dateSuggestion,} = this.props;
    const currentSuggestedValue =(yourExperience===''||dateSuggestion==='')?"": (stringsRenderingSuggestions.suggestedValues[yourExperience][dateSuggestion]);
    const renderedText = (renderNotEnoughTimeToPrepare)?`Liczba tygodni treningowych to ${Math.floor(numberOfTrainingDays/7)} a sugerowana to ${currentSuggestedValue}.  Wróć do formulrza i wybierz odpowiednią ilość tygodni treningowych.`:`Czy jesteś pewny, że chcesz już wyświetlić plan treningowy?`;

      if(renderNotEnoughTimeToPrepare){
        return (
        <div className="fullScreenInfo-CNT">
            <p className='fullScreenInfo-txt'>{renderedText}</p>
            <button className="red-btn" onClick={this.returnToFillInForm}>Wróć do formularza</button>
        </div>
        )
      } else if(renderAreYouSureToGoToTraining){
        return (
        <div className="fullScreenInfo-CNT">
            <p className='fullScreenInfo-txt'>{renderedText}</p>
            <button className="red-btn" onClick={this.returnToFillInForm}>Wróć do formularza</button>
            <button className="green-btn" onClick={this.loadingTrainingPlan}>Tak, zaladuj trening</button>
        </div>
        )
      }
      else{
        return null;
      }
    }
};
