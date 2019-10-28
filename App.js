import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './page.css';
import Refine from './refine.js';
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fields: {},
			data: [],
			searched: false,
			isLoaded: false,
		}
	}

	//loads in clues by fetching from api with offset factor of 100
	componentDidMount() {
		let base = "https://cors-anywhere.herokuapp.com/http://jservice.io/api/clues?offset=";
		for (var c = 0; c < 3000; c += 100) {
			fetch(base+c)
				.then(res => res.json())
				.then(json => {
					console.log(json);
					this.setState({
						data: this.state.data.concat(json),
						isLoaded: true
					})
				})
		}

	}

	//handles submit button function and checks to see if search parameters match with items existing in data table
	//sets data array to empty first, then traverses through api using provided parameters in form fields
	//adds elements to data array and updates the table 
	onSubmit = fields => {
		this.setState({ fields });
			let base = "https://cors-anywhere.herokuapp.com/http://jservice.io/api/clues?";
			let searchVal = "value=";
			let searchCat = "&category=";
			let minDate = "&min_date=";
			let maxDate = "&max_date=";
			let offset = "&offset=";
			if (fields.difficulty !== "") {
				searchVal += fields.difficulty;
			}
			if (fields.category !== "") {
				searchCat += fields.category;
			}
			if (fields.minDate !== "") {
				minDate += fields.minDate;
			}
			if (fields.maxDate !== "") {
				maxDate += fields.maxDate;
			}
			let url = base + searchVal + searchCat + minDate + maxDate + offset;
			console.log(url);
			if (fields.difficulty !== "" || fields.category !== "" || fields.minDate !== "" || fields.maxDate !== "")
					this.setState({ data: [] });
			for (var o = 0; o < 3000; o += 100) {
				fetch(url+o)
				.then(res => res.json())
					.then(json => {
					this.setState({
						isLoaded: true,
						data: this.state.data.concat(json)
					})
				});
			}
	}

	//filters items in data array to items containing search input
	onSearch = fields => {
		this.setState({ fields });
		let key = fields.input;
		let s = [];
		for (var i = 0; i < this.state.data.length; i++) {
			let question = JSON.stringify(this.state.data[i]);
			if (question.includes(key))
				s.push(this.state.data[i]);
		}
		this.setState({ searched: true, data: s });
	}

	//clears search and refine limitations
	onClear = () => {
		this.setState({
			data: []
		})
		let base = "https://cors-anywhere.herokuapp.com/http://jservice.io/api/clues?offset=";
		for (var o = 0; o < 3000; o += 100) {
			fetch(base+o)
				.then(res => res.json())
				.then(json => {
					this.setState({
						data: this.state.data.concat(json),
						isLoaded: true
					})
				})
		}


	}

	render() {
		var { isLoaded, data } = this.state;

		if (!isLoaded) {
			return <div>Loading...</div>;
		}

		else {
			return (
    			<div className="App">
				<h1>Jeopardy Question Bank</h1>
				<div style={{ textAlign: "center", display: "block"  }}>
		  			<Refine onSearch={fields => this.onSearch(fields)} onSubmit={fields => this.onSubmit(fields)} onClear={() => this.onClear()}/>
				</div>
				<div style={{ paddingTop: "50px" }}>
					<ReactTable
						data={data}
						columns={[
						{
							Header: "ID",
							accessor: "id",
							width: 100
						},
						{
							Header: "Category ID",
							accessor: "category_id",
							width: 130
						},
						{
							Header: "Category",
							accessor: "category.title",
							width: 180
						},
						{
							Header: "Question",
							accessor: "question",
							width: 700
						},
						{
							Header: "Answer",
							accessor: "answer"
						},
						{
							Header: "Air Date",
							accessor: "airdate",
							width: 100
						},
						{
							Header: "Value",
							accessor: "value",
							width: 80
						}
					]}
					defaultSorted={[
						{
							id: "id",
							asc: true
						}
					]}
					defaultPageSize={50}
					className="-striped -highlight"
					/>
				</div>
    		</div>
  			);
 	 }
	}
}

export default App;
