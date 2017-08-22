import React, { Component }  from 'react';

export class SaveInfo extends Component {

  closeSaveInfoAndIsblock=(e)=>{
    e.preventDefault();
    window.scrollTo(0,0);
    if ( typeof this.props.closeSaveInfoAndIsblock === 'function' ){
        this.props.closeSaveInfoAndIsblock()
    }
  }

  removeAccountCondition=(e)=>{
    e.preventDefault();
    window.scrollTo(0,0);
    if ( typeof this.props.removeAccountCondition === 'function' ){
        this.props.removeAccountCondition()
    }
  }

  render() {
      if(this.props.saveInfo){
        return (
          <div className="fullScreenInfo-CNT">
            <div className="fullScreenInfo-txt">Trening został właśnie zapisany na Twoje konto</div>
            <button className="green-btn" onClick={this.closeSaveInfoAndIsblock}>OK</button>
          </div>
        )
      } else if(this.props.isBlocking){
        return (
          <div className="fullScreenInfo-CNT">
            <p className="fullScreenInfo-txt">Trening nie mógł być zapisany ponieważ te konto już istnieje lub ma przypisany trening</p>
            <button className="green-btn" onClick={this.closeSaveInfoAndIsblock}>OK</button>
          </div>
        )
      } else if(this.props.isBlockingRemove){
        return (
          <div className="fullScreenInfo-CNT">
            <p className="fullScreenInfo-txt">Czy na pewno chcesz usunąć trening?</p>
            <button className="green-btn" onClick={this.removeAccountCondition}>Tak</button>
            <button className="red-btn" onClick={this.closeSaveInfoAndIsblock}>Nie</button>
          </div>
        )
      }  else if(this.props.removeInfo){
        return (
          <div className="fullScreenInfo-CNT">
            <p className="fullScreenInfo-txt">Trening został usuniety.</p>
            <button className="green-btn" onClick={this.closeSaveInfoAndIsblock}>OK</button>
          </div>
        )
      } else {
        return null;
      }
    }
  };
