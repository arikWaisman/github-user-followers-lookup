import React, {Component} from 'react';

export default class SearchBar extends Component{

	constructor(props){
		super(props);

		this.state = {
			username: ''
		}
	}

	onFormSubmit(e){
		e.preventDefault();
		this.props.searchGithub(this.state.username);
	}

	onInputChange(e){
		this.setState({ username: e.target.value });
	}


	render(){
		return(
			<form  onSubmit={ this.onFormSubmit.bind(this)} className="input-group" style={{width: '100%'}}>
                <input 
                	placeholder="Enter a github username"
                	className="form-control"
                	type="text" 
                	onChange={this.onInputChange.bind(this)} 
                	value={this.state.username} 
            	/>
            	<button className="btn btn-primary" style={{margin: '15px 0'}}>
            		Submit
            	</button>
            </form> 
		);
	}

}