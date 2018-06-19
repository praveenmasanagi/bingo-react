import React from 'react';

export default class Tile extends React.Component {
	constructor() {
		super();
		this.state = {
			classes : "tile"
		}
		
		//Events Binding
		this.crossTheTile = this.crossTheTile.bind(this);
	}
	
	//Events
	crossTheTile() {
		if(this.state.classes === "tile") {
			this.setState({
				classes : "tile crossed"
			});
			this.props.crossedValue(this.props.tileValue);
		} else {
			this.setState({
				classes : "tile"
			});
			this.props.removeCrossedValue(this.props.tileValue);
		}
	}
	
	render() {
		return  (<td className={ this.state.classes } onClick={ this.crossTheTile }> 
					{ this.props.tileValue }
				</td>);
	}
}