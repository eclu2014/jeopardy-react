import React from "react";
import "./App.js";

export default class Clear extends React.Component {
	onClear = e => {
		this.props.onClear();
	}
	
	render() {
		return (
			<button onClick={e => this.onClear(e)}>Clear</button>
		)
	}
}
