import React from "react";
import "./App.js";
import "./page.css";
import DatePicker from "react-datepicker";

export default class Refine extends React.Component {
	state = {
		difficulty: "",
		category: "",
		minDate: "",
		maxDate: "",
		input: ""
	}

	//automatically updates state values as input changes in real time in each field
	change = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	//calls App.js onSubmit method to handle submit button click
	onSubmit = e => {
		e.preventDefault();
		this.props.onSubmit(this.state);
	}
	
	//calls App.js onClear method to handle clear button click
	onClear = e => {
		this.props.onClear();
		this.setState({
			difficulty: "",
			category: "",
			minDate: "",
			maxDate: "",
			input: ""
		});
	}

	//calls App.js onSearch method to handle search button click
	onSearch = e => {
         e.preventDefault();
         this.props.onSearch(this.state);
     }	

	//format form appearance
	render() {
		return (
		  <div style={{ display: "inline-block"  }}>
			Search:
			 <input type="text" name="input" value={this.state.input} onChange={e => this.change(e)}/>
             <button onClick={e => this.onSearch(e)}>Search</button>
			<h3>Refine by:</h3>
			<form align="center">
				<div style={{ display: "inline-block", margin: "15px" }}>
					Value:
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
			<br/>
			<h4>Click "clear" to clear search and refinements</h4>
			<button onClick={() => this.onClear()}>Clear</button>
			</div>
		);
	}
}
