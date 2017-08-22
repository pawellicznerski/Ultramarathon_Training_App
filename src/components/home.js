import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Link,NavLink, Switch } from 'react-router-dom';
import { MovingNumbers } from './movingNumbers.js';
import { ReturnToTopBtn } from './commonPartials/returnToTopBtn';

export class Home extends Component {
  constructor(props) {
  super(props);
  this.state = {
    active: true,
    position: 0,
    position2: 0,
    topScrollBtn:false,
    noOfkm:1,
    noOfkmAction:false,
    changeofstate:false,
    interval:1,
    };
  } //props end

  componentDidMount(){

    this.intervalId = setInterval(() => {
      this.setState({
        position: (this.state.position + 1),
        });
    }, 30);
  }

  toggleClass(e) {
    e.preventDefault();
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  };

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  moveDown(e){
    e.preventDefault();
    const curentmove= window.innerHeight-66;
    window.scrollTo(0,curentmove);
  }

  render(){
    return(
      <div>

      <ReturnToTopBtn></ReturnToTopBtn>

      <section id="home-entry">
        <div className="row home-class" style={{backgroundPosition:this.state.position}}>
          <div className="col-1">
          </div>
          <div className="welcome-text-cnt col-10">
            <div className="welcome-text">
              <div className="welcome-text-top">Profesionalny ultramaratonowy trening rowerowy w kilka chwil.</div>
              <NavLink to={`/wyswietltrening`} style={{textDecoration:"none",color:"white"}}><div className="welcome-btn" >nowy trening</div></NavLink>
              <Route exact path={`/wyswietltrening`}/>
            </div>
            <div className="move-down-cnt"><div onClick={this.moveDown} className="move-down-btn">&nabla;</div></div>
          </div>
          <div className="col-1">
          </div>
        </div>
      </section>

      <section id="encourage-entry">
        <div className="row encourage-class">
          <div className="col-1"></div>
            <div className="encourage-text-cnt col-10">
                <div className="encourage-text-psc-cnt"><p className="encourage-text-psc">Chcesz przejechać</p><p>&nbsp;</p><MovingNumbers></MovingNumbers><p>&nbsp;</p><p className="encourage-text-psc">i nie masz planu treningowego?</p></div>
                <div className="encourage-text-final">Wiemy jak Ci pomóc!</div>
            </div>
          <div className="col-1"></div>
        </div>
        <div id="encourage-advantage-break"></div>
      </section>

      <section id="advantage-entry">
        <div className="row advantage-class">
          <div className="col-1">
          </div>
          <div className="advantage-cnt col-10">

            <div className="advantage-main-title">W treningu jest:</div>
              <div className="advantage-point">
              <div className="advantage-pic-no1"></div>
              <div className="advantage-title">Data rozpoczęcia:
                <div className="advantage-text">trening możesz zacząć od dowolnej daty wpisując go do odpowiedzniego miejsca w formularzu</div>
              </div>
            </div>

            <div className="advantage-point">
              <div className="advantage-pic-no2"></div>
              <div className="advantage-title">Szczyt formy:
                <div className="advantage-text">Oprócz daty rozpoczęcia cyklu treningowego trzeba określić jego koniec. Ostatni dzień treningu to dzień startu</div>
              </div>
            </div>

            <div className="advantage-point">
              <div className="advantage-pic-no3"></div>
              <div className="advantage-title">Progresja:
                <div className="advantage-text">Trening jest dobrany tak, aby rowerzysta stopniowo rozwijał swoje umiejętności, minimalizująć ryzyko przetrenowania i kontuzji</div>
              </div>
            </div>

            <div className="advantage-point">
              <div className="advantage-pic-no4"></div>
              <div className="advantage-title">Opisy treningów:
                <div className="advantage-text">Każdy trening ma swój zapis i nie zawsze widomo o co w nim chodzi. Stąd o każdym typie treningu można przeczytać w opisie, który jest dostępny na naszej stronie</div>
              </div>
            </div>

            <div className="advantage-point">
              <div className="advantage-pic-no5"></div>
              <div className="advantage-title">Różne ociążenia:
                <div className="advantage-text">Każdy typ treningu ma swoje obciążenie, które jest określone w planie</div>
              </div>
            </div>

            <div className="advantage-point">
              <div className="advantage-pic-no6"></div>
              <div className="advantage-title">Różne treningi:
                <div className="advantage-text">Żeby optymalnie przygotować się do zawodów należy stosować różnorodne bodźcce treningowe. Te bodźcce są zapewnione przez różne trenigi pojawiajace sie ultramaratonowym planie.</div>
              </div>
            </div>

            <div className="advantage-point">
              <div className="advantage-pic-no7"></div>
              <div className="advantage-title">Odpoczynek:
                <div className="advantage-text">Sztuką dobrego planu treningowego jest nie tylko dobór odpowiedniego treningu, ale rózniez dobre zaplanowanie dni na regenerację, która jest określona w planie</div>
              </div>
            </div>

            <div className="advantage-point">
              <div className="advantage-pic-no8"></div>
              <div className="advantage-title">Podział na okresy:
                <div className="advantage-text">Każdy treningu musi być podzielony na okresy. W naszym planie bedziesz miał odpowiednio - według prawidłowych proporcji - podzielony trening na właściwe okresy</div>
              </div>
            </div>

          </div>
          <div className="col-1">
          </div>
        </div>
      </section>

      <section id="safety-entry">
        <div id="advantage-chain-break"></div>
        <div id="chain-title">jak zacząć?</div>
        <div className="row chain-class">
          <div className="col-1">
          </div>
          <div className="chain-cnt col-10">

            <div className="chain-all-links">
              <div className="chain-link-no">1</div>
              <div className="chain-link-texts1">Wybierz "nowy trening"</div>
            </div>

            <div className="chain-all-links">
              <div className="chain-link-no">2</div>
              <div className="chain-link-texts2">Wypełnij formularz</div>
            </div>

            <div className="chain-all-links">
              <div className="chain-link-no">3</div>
              <div className="chain-link-texts3">Zaakceptuj dane</div>
            </div>

            <div className="chain-all-links">
              <div className="chain-link-no">4</div>
              <div className=" chain-link-texts4">Wyświetl plan</div>
            </div>

            <div className="chain-all-links">
              <div className="chain-link-no">5</div>
              <div className=" chain-link-texts5">Zapisz plan</div>
            </div>
          </div>
          <div className="col-1">
          </div>
        </div>
        <div id="chain-footer-break">
        </div>
      </section>

      <section id="safety-entry">
        <div className="safety-footer-break">
        </div>
        <div className="row safety-class">
          <div className="col-1">
          </div>
          <div className="safety-cnt col-10">
            <div className="safety-title">bezpieczeństwo!</div>
            <div className="safety-text">
              Ultramaratony mają dobry wpływ na zdrowie i samopoczucie rowerzysty. Niestety, extremalne uprawianie tej dyscypliny niesie za sobą sporo ryzyko kontuzji i przetrenowania. Dlatego pamiętaj, że to jest tylko sugestia planu i sam musisz go na bieżąco modyfikować do swoich potrzeb ponieważ każdy jest inny i wymaga innych bodźcców do rozwoju. Zapraszamy do treningu i Życzymy samych dobrych wyników!
            </div>
          </div>
          <div className="col-1">
          </div>
        </div>
        <div className="safety-footer-break">
        </div>
      </section>

      </div>
    )
  }
}
