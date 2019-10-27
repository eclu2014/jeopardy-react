import React from "react";
import "./App.js";

export default class Clear extends React.Component {
	onClear = () => {
		this.props.onClear();
	}
	
	render() {
		return (
			<button onClick={() => this.onClear()}>Clear</button>
		)
	}
}
