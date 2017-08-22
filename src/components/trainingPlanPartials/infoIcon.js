import React, { Component }  from 'react';
import { test, regeneration, aerobicEndurance, strenghtAndSpeed, strenghtEndurance, dayOff, marathonSimulation, dayOffOrRegeneration}  from '../stringsAndConsts/infoIconTexts.js';


export class InfoIcon extends Component {
  constructor(props) {
  super(props);
  this.state = {
      showInfoText:false,
      currentText:"",
      scrollX:"",
      scrollY:"",
    };
  // this.handleScroll = this.handleScroll.bind(this)
  } //props end


  closeInfoWindow=(e)=>{
    e.preventDefault();
    this.enableScrolling()
    this.setState({
        showInfoText:false,
      });
  }

  showInfo=(e)=>{
    e.preventDefault();
    const infoTextArr= [["Test",test],["Regeneracyjny",regeneration],["Wytrzymałość tlenowa",aerobicEndurance],["Siła i szybkość",strenghtAndSpeed],["Wytrzymałość siłowa",strenghtEndurance],["Wolne",dayOff],["Symulacja ultramaratonu",marathonSimulation],["Wolne lub Regeneracyjny",dayOffOrRegeneration]];

    for (var i = 0; i < infoTextArr.length; i++) {
      if(infoTextArr[i][0]===this.props.type){
        this.disableScrolling()
        this.setState({
          showInfoText:true,
          currentText:infoTextArr[i][1],
        })
      }
    }
  }
  disableScrolling(){
      const x=window.scrollX;
      const y=window.scrollY;
      window.onscroll=function(){window.scrollTo(x, y);};
      this.setState({
        scrollX: x,
        scrollY:y,
      })
  }

  enableScrolling(){
      window.onscroll=function(){};
  }


  render() {
        return (
        <div>
          <div className="infoIcon-CNT" onClick={this.showInfo}></div>
          <div style={{top:this.state.scrollY,left:this.state.scrollX}} className={this.state.showInfoText?"showInfoText-active":"showInfoText-non-active"}>
            <strong>{this.props.type}</strong>
            <div className="abc">{this.state.currentText}</div >
            <button className="green-btn" onClick={this.closeInfoWindow}>OK</button>
          </div>
        </div>
        )
      }
};
