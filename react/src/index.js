import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import reportWebVitals from './reportWebVitals';

console.log(React.version);
function Welcome(props){
  return <h1>Hello, {props.name} {props.nachname}</h1>
}

class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }



  componentDidMount(){
    this.ticker = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.ticker);
  }

  tick(){
    this.setState({
      date: new Date()
    });
  }

  render(){
    return (
    <div>
      <h1>Aktuelle Uhrzeit: {this.state.date.toLocaleTimeString()}</h1>
    </div>
    );
  }

}

class MagicButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {render: true};
  }

  deleteMe(){
    this.setState({render:false});
  }

  render(){
    if(this.state.render){
    return(
      <button onClick={(e) => this.deleteMe()}>
        Delete me
      </button>
        );
    }
    else{
      return null;
    }
      
    }
}

class CurrencyInput extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onCurrencyChange(e.target.value);
  }

  render(){
    const currency = this.props.currency;
    const value = this.props.value;
    return(
      <fieldset>
        <legend>Gib die Menge in {currency} an</legend>
        <input value={value} onChange={this.handleChange}/>
      </fieldset>
    );
  }
}

class CurrencyCalculator extends React.Component {
  constructor(props){
    super(props);
  this.state = {currency: 'Euro', value: ''};
  this.handleEuroChange = this.handleEuroChange.bind(this);
  this.handleDollarChange = this.handleDollarChange.bind(this);
  this.handleBitcoinChange = this.handleBitcoinChange.bind(this);
  }

  handleDollarChange(value){
    this.setState({currency: 'Dollar', value});
  }

  handleEuroChange(value){
    this.setState({currency: 'Euro', value});
  }

  handleBitcoinChange(value){
    this.setState({currency: 'Bitcoin', value});
  }



  render(){
    const value = this.state.value;
    const currency = this.state.currency;
    let euro = 0;
    let dollar = 0;
    let bitcoin = 0;

    if(currency == "Euro"){
      euro = value;
      dollar = (1.13*value).toFixed(2);
      bitcoin = (0.000021*value);
    }
    else if(currency == "Dollar"){
       dollar = value;
       euro = (0.88*value).toFixed(2);
       bitcoin = (0.000018*value);
    }
    else{
      bitcoin = value;
      dollar = (54459.5*value).toFixed(2);
      euro = (48114.97*value).toFixed(2);
    }
   


    return (
      <div>
        <CurrencyInput currency="Euro" value={euro}onCurrencyChange={this.handleEuroChange}/>
        <CurrencyInput currency="Dollar" value={dollar}onCurrencyChange={this.handleDollarChange}/>
        <CurrencyInput currency="Bitcoin" value={bitcoin} onCurrencyChange={this.handleBitcoinChange} />
      </div>
    )
  }

}

class MagicTable extends React.Component{
  createTable(){
    let table = [];
    for(let i = 0;i < 10; i++){
      let children = [];
      table.push(<tr><td><MagicButton/></td></tr>)
    }

    return table;
  }

  render(){
    return (<table>
      {this.createTable()}
    </table>);
  }
}

ReactDOM.render(

  <App/>,
  document.getElementById("root")
);






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
