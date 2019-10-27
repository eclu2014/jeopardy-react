import React from "react";
import "./App.js";

export default class Search extends React.Component {
	state = {
		input: ""
	}

	change = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	onSearch = e => {
		e.preventDefault();
		this.props.onSearch(this.state);
	}

	render() {
		return (
			<div style={{ display: "inline-block" }}>
				Search:
				<input type="text" name="input" value={this.state.input} onChange={e => this.change(e)}/>
				<button onClick={e => this.onSearch(e)}>Search</button>
			</div>
		)
	}
}
