import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {ApiAiClient, ApiAiStreamClient} from "api-ai-javascript";

class App extends Component {
  alertMe() {
    alert('hi');
  }
  initAIClient() {

    const client = new ApiAiClient({accessToken: 'f44c44a522d54e3491baa0f04b825cf0', streamClientClass: ApiAiStreamClient});
client

.textRequest('5 stars hotel in Chicago!')
    .then((response) => {/* do something */})
    .catch((error) => {/* do something here too */})

    // const client = new ApiAi.ApiAiClient({accessToken: 'f44c44a522d54e3491baa0f04b825cf0'});
    // let promise = client.textRequest('5 stars hotel in Chicago');

    // promise
    //     .then(handleResponse)
    //     .catch(heandleError);

    // function handleResponse(serverResponse) {
    //         console.log(serverResponse);
    // }
    // function heandleError(serverError) {
    //         console.log(serverError);
    // }

  }
  render() {
    this.initAIClient();
    return (
      <div>
      
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css" />
      <script defer src="https://code.getmdl.io/1.3.0/material.min.js" />
        <iframe className="main-website" src="https://www.expedia.com">
          <p>Your browser does not support iframes.</p>
        </iframe>

        <form className="ai-assistant" onSubmit={this.alertMe}>
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" id="help" />
            <label className="mdl-textfield__label" htmlFor="help">How can I help...</label>
          </div>
          <i className="material-icons">mic</i>
        </form>
      </div>
    );
  }
}

export default App;
