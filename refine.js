import React from "react";
import "./App.js";
import "./page.css";

export default class Refine extends React.Component {
	state = {
		difficulty: "",
		category: "",
		month: "",
		day: "",
		year: "",
	}

	change = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	onSubmit = e => {
		e.preventDefault();
		this.props.onSubmit(this.state);
		this.setState({
			difficulty: "",
			category: "",
			month: "",
			day: "",
			year: "",
		});
	}
	

	render() {
		return (
		  <div style={{ display: "inline-block"  }}>
			<h3>Refine by:</h3>
			<form align="center">
				<div style={{ display: "inline-block", margin: "15px" }}>
					Difficulty:
					<input type="text" name="difficulty" value={this.state.difficulty} onChange={e => this.change(e)}/>
				</div>
				<div style={{ display: "inline-block", margin: "15px" }}>
					Category ID:
					<input type="text" name="category" value={this.state.category} onChange={e => this.change(e)}/>
				</div>
				<div style={{ display: "inline-block", margin: "15px" }}>
					Date:
					<div style={{ display: "inline-block"  }}><input type="text" name="month" placeholder="Month" value={this.state.month} onChange={e => this.change(e)}/>
					<input type="text" name="day" placeholder="Day" value={this.state.day} onChange={e => this.change(e)}/>
					<input type="text" name="year" placeholder="Year" value={this.state.year} onChange={e => this.change(e)}/>
					</div>
				</div>	       	
			</form>
			<br />
				<button onClick={e => this.onSubmit(e)}>Submit</button>
			</div>
		);
	}
}
