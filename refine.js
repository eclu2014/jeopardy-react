import React from "react";
import "./App.js";
import "./page.css";
import DatePicker from "react-datepicker";

export default class Refine extends React.Component {
	state = {
		difficulty: "",
		category: "",
		//minDate: new Date(),
		//maxDate: new Date()
		minDate: "",
		maxDate: "",
	}

	change = e => {
		this.setState({[e.target.name]: e.target.value});
	};

/*	handleChange = date  => {
		this.props.handleChange();
	}

	handleChange2 = date => {
		this.props.handleChange2();
	}*/

	onSubmit = e => {
		e.preventDefault();
		this.props.onSubmit(this.state);
		this.setState({
			difficulty: "",
			category: "",
			minDate: "",
			maxDate: "",
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
					Start Date:
					<input type="text" name="minDate" placeholder="YYYY-MM-DD" value={this.state.minDate} onChange={e => this.change(e)}/>
				</div>
				<div style={{ display: "inline-block", margin: "15px" }}>
					End Date:
					<input type="text" name="maxDate" placeholder="YYYY-MM-DD" value={this.state.maxDate} onChange={e => this.change(e)}/>
				</div>	       	
			</form>
			<br />
				<button onClick={e => this.onSubmit(e)}>Submit</button>
			</div>
		);
	}
}
