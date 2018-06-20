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
      newNumber : 0,
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
        <div className="ticketsContainer">
          <div className="titleContainer">
            <h3>Bingo</h3>
          </div>
          <div className="header">
            <div className="newNumber">
              {
                this.state.newNumber !== 0 ?
                  <div className="newNumberContainer">
                    <span className="lastBallText">Last Ball</span>
                    <span className="lastNumber">{ this.state.newNumber }</span>
                  </div>
                : null
              }
              <button onClick={ this.getNewNumber } className={"getNewNumberButton " + (this.state.newNumber !== 0 ? 'reducedMargin' : '')}>New Number</button>
            </div>
            <div className="previousNumbers">
              {
                this.state.previousBalls.length > 0 ?
                  <p className="previousBallText">PREVIOUS BALLS</p>
                : null
              }
              {
                this.state.previousBalls.map(function(value, index) {
                  return (
                    <span className="previousBall" key={ index }>{ value }</span>
                  )
                }, this)
              }
            </div>
          </div>
          <div className="ticketsRow">
            <Ticket ticketContent={ this.state.first }/>
            <Ticket ticketContent={ this.state.second }/>
          </div>
          <div className="ticketsRow">
            <Ticket ticketContent={ this.state.third }/>
            <Ticket ticketContent={ this.state.fourth }/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
