import React, { Component } from 'react';


export class MovingNumbers extends Component {
  constructor(props) {
  super(props);
  this.state = {
    active: false,
    noOfclass:0,
    };
    // this.handleScroll = this.handleScroll.bind(this)

  } //props end

  setClassName(noOfclassConst){
    const classArr=['moving-numbers0','moving-numbers1','moving-numbers2','moving-numbers3'];
    this.setState({
      currentClassName:classArr[noOfclassConst],
    })
  }

  componentDidMount(){
  this.intervalId3 = setInterval(() => {
        if(this.state.noOfclass===3){
          this.setState({
            noOfclass:0,
            active:true,
          });
        } else {
          this.setState({
            noOfclass:this.state.noOfclass+1,
            active:true,
          });
        }
        this.setClassName(this.state.noOfclass);
      },1000 ,
    );
  }

  componentWillUnmount(){
    clearInterval(this.intervalId3);
  }

  render(){
    return(
      <div className="moving-numbersAndKm" style={{borderSize:"1px",borderColor:"yellow"}}>
        <div className={this.state.active?this.state.currentClassName:'moving-numbers0'}>{300+(200*this.state.noOfclass)}</div>
        <div> km</div>
      </div>
    )
  }//end of render
}
