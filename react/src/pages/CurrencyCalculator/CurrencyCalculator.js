import React from "react";
import { useParams } from "react-router";
import CurrencyInput from './CurrencyInput';

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
        <CurrencyInput currency="Euro" value={euro} onCurrencyChange={this.handleEuroChange}/>
        <CurrencyInput currency="Dollar" value={dollar} onCurrencyChange={this.handleDollarChange}/>
        <CurrencyInput currency="Bitcoin" value={bitcoin} onCurrencyChange={this.handleBitcoinChange} />

      </div>
    )
  }

}

function Currency(){
  let {currency1, currency2} = useParams();
  return <div>
    <CurrencyCalculator />
    <h1>Currency1: {currency1}</h1>
    <h1>Currency2: {currency2}</h1>
  </div>

}

export default Currency;