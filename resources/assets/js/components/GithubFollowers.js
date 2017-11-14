import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';
import axios from 'axios';

const MYAPI_URL = 'http://githubfollowers.test/api';

export default class GithubFollowers  extends Component {

    constructor(props){
        super(props);

        this.state = {
            userData: null,
            followers: [],
            followersPage: 0,
            error: ''
        }
    }

    searchGithub(username){

        axios.post(`${MYAPI_URL}/search_github`, {username: username} )
            .then( (response) => {
               this.setState({ 
                    userData: response.data,
                    followers: response.data.followers,
                    followersPage: 1,
                    error: '' 
                });
            } )
            .catch( (error) => {
                this.setState({error: 'there was an error with your request'});
            });
    }

    getMoreFollowers(){
        axios.post(`${MYAPI_URL}/load_more_followers`, { 
                page: this.state.followersPage + 1,
                followersUrl: this.state.userData.followers_url
            })
            .then( (response) => {
                this.setState({
                    followers: [...this.state.followers, ...response.data],
                    followersPage: this.state.followersPage + 1 //changing this here ensures the next request will load the next page after we receive a response
                })
            })
            .catch( (error) => {
                this.setState({error: 'there was an error with loading more followers'});
            })
    }

    renderUserData(){

        const {userData} = this.state;
        if(!!userData == false){
            return null;
        }
        return(
            <div>
                <p>
                    <img src={userData.searched_user_avatar} style={{width: '150px', height: '150px'}}/>
                </p>
                <p>
                    <b>Handle:</b> {userData.searched_user_handle}
                </p>
                <p>
                    <b>Total Followers:</b> {userData.total_followers}
                </p>
            </div>
        );
    }

    renderGithubFollowers(){

        const { followers } = this.state;

        if(!!followers == false){
            return null;
        }
        let rendered = 0;
        let html = followers.map( (follower, i) => {
            rendered++;
            return(
                   <img key={follower.login} src={follower.avatar_url} style={{width: '20%', float: 'left', padding: '5px'}}/>
            ); 
        });

        return html;

    }

    renderLoadMore(){
        const { userData, followers } = this.state;

        if(!!userData == false){
            return null;
        }

        if( followers.length < userData.total_followers ){
            return(
                <div  style={{width: '100%', clear: 'both', margin: '15px 0'}}>
                    <button onClick={ () => { this.getMoreFollowers() } } className="btn btn-success">Load More Followers</button>
                </div>
            );
        }

    }
    

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="text-center">
                            <h1>Search a Github Username</h1>
                            <SearchBar searchGithub={this.searchGithub.bind(this)}/>
                            {!!this.state.error && <div className="danger alert-danger">{this.state.error}</div>} 
                            {this.renderUserData()}
                            {this.renderLoadMore()}
                            {this.renderGithubFollowers()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('hook')) {
    ReactDOM.render(<GithubFollowers />, document.getElementById('hook'));
}
