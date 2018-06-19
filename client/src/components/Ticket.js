import React from 'react';
import TicketRow from './TicketRow';
import Axios from 'axios';

export default class Ticket extends React.Component {
	constructor() {
		super();
		this.state = {
			dataCrossed : [],
			classes : 'ticket'
		}
		
		//Events Binding
		this.submitTicket = this.submitTicket.bind(this);
		this.addCrossedValueInTicket = this.addCrossedValueInTicket.bind(this);
		this.removeCrossedValueInTicket = this.removeCrossedValueInTicket.bind(this);
	}
	
	//Events
	submitTicket() {
		let self = this;
		console.log("Submit Ticket");
		var qs = require('qs');
		if(this.state.dataCrossed.length !== 25){
			alert("All the values are not crossed");
		} else {
		    Axios({
		      method: 'get',
		      url : '/api/checkBingo',
		      params : {
		      	'data' : self.state.dataCrossed
		      },
		      'paramsSerializer': function(params) {
       		    return qs.stringify(params, {arrayFormat: 'repeat'})
    		  }
		    }).then(function(response){
		      console.log("checkBingo was success ",response.data.isBingo);
		      if(response.data.isBingo) {
				self.setState({
					classes : "tile bingo"
				});
		      } else {
		      	alert("False bingo claim");
				self.setState({
					classes : "ticket"
				});		      	
		      }
		    }).catch(function(error) {
		      console.log('checkBingo was failure',error);
		    });
		}
	}

	addCrossedValueInTicket(val) {
		this.setState({
			dataCrossed : this.state.dataCrossed.concat(val)
		});
	}

	removeCrossedValueInTicket(val) {
		let tempArray = this.state.dataCrossed;
		let index = this.state.dataCrossed.indexOf(val);
		if(index > -1) {
			tempArray.splice(index,1);
		}
		this.setState({
			dataCrossed : tempArray
		});
	}
	
	render() {
		return  (<div className={ this.state.classes }>
					<table>
						{
							this.props.ticketContent !== undefined && this.props.ticketContent.length === 25 ?
								<tbody>
									<TicketRow crossedRowData={ this.addCrossedValueInTicket } removeCrossedRowData={ this.removeCrossedValueInTicket } rowData={ this.props.ticketContent.slice(0, 5) }/>
									<TicketRow crossedRowData={ this.addCrossedValueInTicket } removeCrossedRowData={ this.removeCrossedValueInTicket } rowData={ this.props.ticketContent.slice(5, 10) }/>
									<TicketRow crossedRowData={ this.addCrossedValueInTicket } removeCrossedRowData={ this.removeCrossedValueInTicket } rowData={ this.props.ticketContent.slice(10, 15) }/>
									<TicketRow crossedRowData={ this.addCrossedValueInTicket } removeCrossedRowData={ this.removeCrossedValueInTicket } rowData={ this.props.ticketContent.slice(15, 20) }/>
									<TicketRow crossedRowData={ this.addCrossedValueInTicket } removeCrossedRowData={ this.removeCrossedValueInTicket } rowData={ this.props.ticketContent.slice(20, 25) }/>
								</tbody>
							: null
						}
					</table>
					<button onClick={ this.submitTicket }>Submit</button>
				</div>);
	}
}