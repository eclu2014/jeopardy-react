import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './page.css';
import Refine from './refine.js';
import Search from './search.js';
import Clear from './clear.js';
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
			question: [],
			answer: [],
			value: [],
			category: [],
			airDate: [],
			id: []
		}
	}

	componentDidMount() {
		fetch('http://jservice.io/api/clues')
			.then(res => res.json())
			.then(json => {
				this.setState({
					isLoaded: true,
					data: json,
				})	
			})
	}

	onSubmit = fields => {
		this.setState({ fields });
		
		if (this.state.searched == false) {
			let base = "http://jservice.io/api/clues?";
			let searchVal = "value=";
			let searchCat = "&category=";
			if (typeof fields.difficulty !== "undefined") {
				searchVal += fields.difficulty;
			} 
			if (typeof fields.category !== "undefined") {
				searchCat += fields.category; 
			}
			let url = base + searchVal + searchCat;
			fetch(url)
			.then(res => res.json())
				.then(json => {
				this.setState({
					isLoaded: true,
					data: json,
				})	
			});
		} else {
			let refined = [];
			let add = true;
			for (var i = 0; i < this.state.data.length; i++) {
				if (typeof fields.difficulty == "undefined" && typeof fields.category == "undefined")
					break;
				let searchVal = "";
				let searchCat = "";
				if (typeof fields.difficulty !== "undefined") {
					searchVal = fields.difficulty;
				}
				if (typeof fields.category !== "undefined")
					searchCat = fields.category;
				let dataVal = JSON.stringify(this.state.data[i].value);
				let dataCat = JSON.stringify(this.state.data[i].category_id);
				if (searchCat !== "" && searchVal !== "") {
					if (searchCat == dataCat && searchVal == dataVal)
						refined.push(this.state.data[i]);
				} else if (searchCat == "" && searchVal !== "") {
					if (searchVal == dataVal)
						refined.push(this.state.data[i]);
				} else {
					if (searchCat == dataCat)
						refined.push(this.state.data[i]);
				}
			}
			this.setState({ data: refined });
		}
	}

	onSearch = fields => {
		this.setState({ fields });
		/*if (this.state.searched === true) {
			fetch("http://jservice.io/api/clues")
            	  .then(res => res.json())
                	  .then(json => {
                  	this.setState({
                    	  isLoaded: true,
                       	  data: json,
						  searched: false
                 	 })
              	});
		}*/
		let key = fields.input;
		let s = [];
		for (var i = 0; i < this.state.data.length; i++) {
			let question = JSON.stringify(this.state.data[i]);
			if (question.includes(key))
				s.push(this.state.data[i]);
		}
		this.setState({ searched: true, data: s });
	}
		
	onClear = () => {
		fetch("http://jservice.io/api/random?count=100")
			.then(res => res.json())
				.then(json => {
					this.setState({
						data: json	
					})
				});
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
				<div style={{ textAlign: "center", display: "block" }}>
					<Search onSearch={fields => this.onSearch(fields)}/>
				</div>
				<div style={{ textAlign: "center", display: "block"  }}>	
		  			<Refine onSubmit={fields => this.onSubmit(fields)}/>
				</div>
				<h4>Click "clear" to clear search and refinements</h4>
     			<div>
					<Clear onClear={() => this.onClear()}/>
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
