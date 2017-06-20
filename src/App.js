import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {ApiAiClient} from "api-ai-javascript/ApiAiClient"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {client: new ApiAiClient({accessToken: 'f44c44a522d54e3491baa0f04b825cf0'})};
  }
  handleAICommand(e) {
    e.preventDefault();
    this.state.client
      .textRequest(document.getElementById('help').value)
      .then((response) => {
        switch(response.result.action){
          case 'fiveStarsHotelsChicago': 
          document.getElementById('expediaForm').src = 'https://www.expedia.com/Hotel-Search?_xpid=11905%7C1#destination=Chicago+(and+vicinity),+Illinois,+United+States+of+America&startDate=07/11/2017&endDate=07/14/2017&adults=1&regionId=178248&star=50&sort=recommended';
          break;
        }
      })
      .catch((error) => {console.log(error)});
  }

  render() {
    return (
      <div>
      
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css" />
      <script defer src="https://code.getmdl.io/1.3.0/material.min.js" />
        <iframe id="expediaForm" className="main-website" src="https://www.expedia.com">
          <p>Your browser does not support iframes.</p>
        </iframe>

        <form className="ai-assistant" onSubmit={this.handleAICommand.bind(this)}>
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
