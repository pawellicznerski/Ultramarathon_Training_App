import React, { Component }  from 'react';

export class MoveToDay extends Component {
  constructor(props) {
  super(props);
  this.state = {
      showInfoText:false,
      currentText:"",
      scrollX:"",
      scrollY:"",
      currentMiddleScreenDay:1,
      currentMiddleScreenDate:this.props.data.dateStart,
      activateHandleScroll:true,
    };
  this.handleScroll = this.handleScroll.bind(this)
  this.handleInputChangeMoveToField = this.handleInputChangeMoveToField.bind(this);
  this.scrollToDayDate = this.scrollToDayDate.bind(this);
  } //props end

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e){
    e.preventDefault();
    const y=window.scrollY;
    console.log("y:",y);
    // window.onscroll=function(){window.scrollTo(x, y);};
    const dateStartNo = Number(new Date(this.props.data.dateStart));
    if(this.state.activateHandleScroll){
      this.setState({
        scrollY:y,
        currentMiddleScreenDay:Math.floor((this.state.scrollY)/134)+1,
        currentMiddleScreenDate:new Date(((this.state.currentMiddleScreenDay-1)*86400000)+dateStartNo).toJSON().slice(0,10),
      })
    } else {
      this.setState({
        activateHandleScroll:true,
      })
    }
  }

  scrollToDayDate(e){
    e.preventDefault();
    const yValue = ((this.state.currentMiddleScreenDay-1)*134);
    this.setState({
      activateHandleScroll:false,
    })
    window.scrollTo(0,yValue);
  }


  handleInputChangeMoveToField=(e)=>{
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;//potrzebne w razie dolączenia checkbox-a
    const name = target.name;
    const dateStartNo = Number(new Date(this.props.data.dateStart));
    if(e.target.name==="currentMiddleScreenDay"){
      this.setState({
         [name]: value,
         currentMiddleScreenDate:new Date(((value-1)*86400000)+dateStartNo).toJSON().slice(0,10),
       });
     }else if(e.target.name==="currentMiddleScreenDate"){
      this.setState({
         [name]: value,
         currentMiddleScreenDay:Math.floor((new Date(value)-dateStartNo)/86400000)+1,
       });
     }
  }

  handleToDateField=()=>{
  }



  render() {
        return (
          <div id="moveToDay-CNT">

          <div id="btn-cnt" >
            <button onClick={this.handleToDateField}>Wyszukaj dzień</button>
          </div>

          <div id="moveToDay-field">
          <form onSubmit={this.scrollToDayDate}>
            <p className="">dnia:</p>
              <div className="inputs-cnts">
                <label>
                  <input
                    name="currentMiddleScreenDay"
                    value={this.state.currentMiddleScreenDay}
                    onChange={this.handleInputChangeMoveToField}
                    type="number"
                    placeholder={this.state.currentMiddleScreenDay}
                    max={this.props.data.numberOfTrainingDays}
                    min="1"
                    title="Wpisz właściwy dzień."
                  />
                </label>
              </div>

              <div className="inputs-cnts">
                <p className="">data:</p>
                <label>
                  <input
                  type="date"
                  value={this.state.currentMiddleScreenDate}
                  onChange={this.handleInputChangeMoveToField}
                  name="currentMiddleScreenDate"
                  min={this.props.data.dateStart}
                  max={this.props.data.dateEnd}
                  title="Wpisz właściwą datę."
                  />
                </label>
              </div>
              <button className="" type="submit">Przjdź do:</button>
          </form>
        </div>
      </div>
        )
      }
};
