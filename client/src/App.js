import React, { Component } from 'react';
import Ticket from './components/Ticket';
import Axios from 'axios';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      first : [],
      second : [],
      third : [],
      fourth : [],
      newNumber : "",
      randomArr : [],
      previousBalls : []
    }
    
    //Events Binding
    this.getTickets = this.getTickets.bind(this);
    this.getNewNumber = this.getNewNumber.bind(this);
    this.getRandomTickets = this.getRandomTickets.bind(this);
  }

  componentDidMount() {
    this.getTickets();
  }

  //Events
  getTickets() {
    this.setState({
        first : this.getRandomTickets(),
        second : this.getRandomTickets(),
        third : this.getRandomTickets(),
        fourth : this.getRandomTickets()
    });
  }

  getRandomTickets() {
    let tempArray = [];
    while(tempArray.length < 25){
        let randomnumber = Math.floor(Math.random()*100) + 1;
        if(tempArray.indexOf(randomnumber) > -1) continue;
        tempArray[tempArray.length] = randomnumber;
    }
    return tempArray;
  }

  getNewNumber() {
    let randomnumber;
    let self = this;
    Axios({
      method: 'get',
      url : '/api/drawBall'
    }).then(function(response){
      randomnumber = response.data.nextNumber;
      self.setState({
        randomArr : self.state.randomArr.concat(randomnumber),
        newNumber : randomnumber,
        previousBalls : self.state.randomArr.slice(Math.max(self.state.randomArr.length - 5, 0))
      });
    }).catch(function(error) {
      console.log('drawBall was failure',error);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bingo</h1>
        </header>
        <div className="newNumber">
          <h3 className="App-title">{ this.state.newNumber }</h3>
          <div>
          <span className="previousBall">Previous Balls</span>
            {
              this.state.previousBalls.map(function(value, index) {
                return (
                  <span className="previousBall" key={ index }>{ value }</span>
                )
              }, this)
            }
          </div>
          <button onClick={ this.getNewNumber } >Get new number</button>
        </div>
        <div className="ticketsContainer">
          <Ticket ticketContent={ this.state.first }/>
          <Ticket ticketContent={ this.state.second }/>
          <Ticket ticketContent={ this.state.third }/>
          <Ticket ticketContent={ this.state.fourth }/>
        </div>
      </div>
    );
  }
}

export default App;
