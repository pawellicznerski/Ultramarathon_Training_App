import React, { Component }  from 'react';

export class ReturnToTopBtn extends Component {
  constructor(props) {
  super(props);
  this.state = {
    topScrollBtn:false,
    };
    this.handleScroll = this.handleScroll.bind(this)
  } //props end

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e){
    e.preventDefault();
        if (window.scrollY > window.innerHeight-67) {
          this.setState({
            topScrollBtn:true,
            });
        } else if(window.scrollY < window.innerHeight-67){
          this.setState({
            topScrollBtn:false,
            });
        }
  }

  returnToTop(e){
    e.preventDefault();
    window.scrollTo(0,0);
  }

  render() {
      return (
        <div onClick={this.returnToTop} className="show-return-btn" style={{display:this.state.topScrollBtn ? "block":"none"}}></div>
      )
    }
};
