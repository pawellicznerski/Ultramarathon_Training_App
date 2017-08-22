import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Link,NavLink, Switch } from 'react-router-dom';


export class FooterComponent extends Component {
  constructor(props) {
  super(props);
  this.state = {
    active: true,
    };

} //props end
   toggleClass(e) {
   };


render() {
  return (
    <section  className="footer-container">
      <div className="container">

          <div className="col-1"></div>
          <div  className="col-10">
            <div className="logo-rights_cnt">
              <div className="logo-white"></div>
            </div>
            <div className="socials">
                <a href="https://www.facebook.com" target="_blank"><div className="fb"></div></a>
                <a href="https://www.pinterest.com" target="_blank"><div className="pin"></div></a>
                <a href="https://pl.linkedin.com/" target="_blank"><div className="lin"></div></a>
                <a href="https://plus.google.com/" target="_blank"><div className="g"></div></a>
            </div>
          </div>
          <div className="col-1"></div>

      </div>

      <div className="copy-rights">&copy; pawellicznerski</div>
    </section>
  );
}

}//end of footerComponent
