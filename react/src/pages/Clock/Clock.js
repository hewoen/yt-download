import React from "react";

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

  export default Clock;