import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router,Route,NavLink, Switch } from 'react-router-dom';
import { EntryForm } from './components/entryForm.js';
import { FillInForm } from './components/fillInForm.js';
import { NoMatch } from './components/noMatch.js';
import { TrainingPlan }  from './components/trainingPlan.js';
import { TrainingPlanPDF }  from './components/trainingPlanPDF.js';
import { Sticky }  from './components/sticky.js';
import { Home }  from './components/home.js';
import { FooterComponent }  from './components/footer.js';


class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    active: true,
    };
    this.toggleClass = this.toggleClass.bind(this);

} //props end
   toggleClass(e) {
     e.preventDefault();
     const currentState = this.state.active;
     this.setState({ active: !currentState });
   };


render() {
  return (
    <Router history={history}>
      <div className="App">
        <div className="container">
            <nav className="nav">

              <NavLink
                to={"/"||"/Ultramarathon_Training_App"}>
                <div className="nav__menu-logo"></div>
              </NavLink>

              <div className={this.state.active ?"nav__btns-cnt nav__btns-cnt_opened": "nav__btns-cnt nav__btns-cnt_closed"}>
                <div
                  className={this.state.active ?"nav__btns-cnt__menu-btn nav__btns-cnt__menu-btn_opened" : "nav__btns-cnt__menu-btn nav__btns-cnt__menu-btn_closed"} onClick={this.toggleClass}>
                </div>

                <div className={this.state.active ?"nav__btns-cnt__link-btns-cnt nav__btns-cnt__link-btns-cnt_opened":"nav__btns-cnt__link-btns-cnt nav__btns-cnt__link-btns-cnt_closed"}>
                  <NavLink
                    to={`/Ultramarathon_Training_App/wyswietltrening`}
                    style={{ textDecoration: 'none'}} >
                    <div className={this.state.active ?"nav__btns-cnt__link-btns-cnt__el nav__btns-cnt__link-btns-cnt__el_closed":"nav__btns-cnt__link-btns-cnt__el"}>
                      logowanie
                    </div>
                  </NavLink>

                  <NavLink
                    to={`/Ultramarathon_Training_App/nowekonto`}
                    style={{ textDecoration: 'none' }} >
                    <div className={this.state.active ?"nav__btns-cnt__link-btns-cnt__el nav__btns-cnt__link-btns-cnt__el_closed":"nav__btns-cnt__link-btns-cnt__el"}>
                      nowe konto
                    </div>
                  </NavLink>
                </div>
              </div>

            </nav>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/Ultramarathon_Training_App" component={Home}/>
            <Route exact path="/Ultramarathon_Training_App/wyswietltrening" component={EntryForm}/>
            <Route exact path="/Ultramarathon_Training_App/nowekonto" component={FillInForm}/>
            <Route exact path={`/Ultramarathon_Training_App/nowekonto/trainingPlan/:login`} component={TrainingPlan} state/>
            <Route exact path={`/Ultramarathon_Training_App/nowekonto/trainingPlan/:login/PDF`} component={TrainingPlanPDF}/>
            <Route component={NoMatch}/>
          </Switch>
          <footer>
            <FooterComponent/>
          </footer>
        </div>
      </div>
    </Router>
  );
}

}//end of App

export default App;
