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
              <nav id="row-1">
                <NavLink to={"/"||"/Ultramarathon_Training_App"}><div className="menu-logo"> </div></NavLink>
                <div className={this.state.active ? "nav-btns-cont nav-btns-cont0": "nav-btns-cont nav-btns-cont1"}>
                  <div className={this.state.active ? "menu-btn menu-btn0": "menu-btn menu-btn1"} onClick={this.toggleClass}></div>
                  <NavLink to={`/Ultramarathon_Training_App/wyswietltrening`} style={{ textDecoration: 'none'}} ><div className="nav-btns nav-btn1-colr"><p>logowanie</p></div></NavLink>
                  <NavLink to={`/Ultramarathon_Training_App/nowekonto`} style={{ textDecoration: 'none' }} ><div className="nav-btns nav-btn2-colr"><p>nowe konto</p></div></NavLink>
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
              <FooterComponent></FooterComponent>
            </footer>
        </div>
      </div>
    </Router>
  );
}

}//end of App

export default App;
