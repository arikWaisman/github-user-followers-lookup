<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class GithubFollowersController extends Controller
{
    function index(){

    	return view('index');

    }

    function search(Request $request){

    	$user_client = new Client(); 
		$user_result = $user_client->request('GET', 'https://api.github.com/users/' . $request->username);
		$user_body_string = $user_result->getBody();
		$user_parsed_body = json_decode($user_body_string);
	


		if($user_result->getStatusCode() == 200 ){

			$response_arr = [];
			$response_arr['searched_user_avatar'] = $user_parsed_body->avatar_url;
			$response_arr['searched_user_handle'] = $user_parsed_body->login;
			$response_arr['total_followers'] = $user_parsed_body->followers;
			$response_arr['followers_url'] = $user_parsed_body->followers_url;
			$response_arr['followers'] = $this->getUsersFollowers(1, $user_parsed_body->followers_url);


			return response()->json($response_arr, 200);


		}

    }

    function loadMoreFollowers(Request $request){

    	$response_arr = $this->getUsersFollowers( $request->page, $request->followersUrl );

    	return response()->json($response_arr, 200);
    }

    function getUsersFollowers($page, $url){

		$client = new Client(); 
		$followers_result = $client->request('GET', $url, [
		    'query' => ['per_page' => '5', 'page' => $page]
		]);
		

		$followers_body_string = $followers_result->getBody();
		$followers_parsed_body = json_decode($followers_body_string);

		return ($followers_result->getStatusCode() == 200 )? $followers_parsed_body : [];

    }
}
