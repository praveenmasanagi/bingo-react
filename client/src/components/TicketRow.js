import React from 'react';
import Tile from './Tile';

export default class TicketRow extends React.Component {
	constructor() {
		super();
		this.state = {
		}
		
		//Events Binding
		this.addCrossedValInRow = this.addCrossedValInRow.bind(this);
		this.removeCrossedValInRow = this.removeCrossedValInRow.bind(this);
	}

	//Events
	addCrossedValInRow(val) {
        this.props.crossedRowData(val);
	}

	removeCrossedValInRow(val) {
		this.props.removeCrossedRowData(val);
	}
	
	render() {
		return  (<tr>
					<Tile crossedValue={ this.addCrossedValInRow } removeCrossedValue={ this.removeCrossedValInRow } tileValue={ this.props.rowData[0] }/>
					<Tile crossedValue={ this.addCrossedValInRow } removeCrossedValue={ this.removeCrossedValInRow } tileValue={ this.props.rowData[1] }/>
					<Tile crossedValue={ this.addCrossedValInRow } removeCrossedValue={ this.removeCrossedValInRow } tileValue={ this.props.rowData[2] }/>
					<Tile crossedValue={ this.addCrossedValInRow } removeCrossedValue={ this.removeCrossedValInRow } tileValue={ this.props.rowData[3] }/>
					<Tile crossedValue={ this.addCrossedValInRow } removeCrossedValue={ this.removeCrossedValInRow } tileValue={ this.props.rowData[4] }/>
				</tr>);
	}
}