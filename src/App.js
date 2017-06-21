import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {ApiAiClient} from "api-ai-javascript/ApiAiClient";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listening: false,
      client: new ApiAiClient({accessToken: 'f44c44a522d54e3491baa0f04b825cf0'})
    };

    window.recognition;
    window.accessToken = "f44c44a522d54e3491baa0f04b825cf0";
    window.baseUrl = "https://api.api.ai/v1/";
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
          case 'navigateThingsToDo':
          document.getElementById('expediaForm').src = 'https://www.expedia.com/things-to-do/search?location=Miami%2C+Florida&latLong=25.771780%2C-80.190090&rid=178286&regionType=MULTICITY&countryCode=US&startDate=06%2F24%2F2017&endDate=06%2F25%2F2017&_xpid=11905%7C1';
          break;
          case 'navigateScratchpad':
          document.getElementById('expediaForm').src = 'https://www.expedia.com/scratchpad';
          break;
          case 'bestPlaceSkiing':
          document.getElementById('expediaForm').src = 'https://viewfinder.expedia.com/features/9-best-places-ski-around-world';
          break;
        }
      })
      .catch((error) => {console.log(error)});
  }
  send() {
      var text = document.getElementById("help").value;
      window.$.ajax({
        type: "POST",
        url: window.baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "Authorization": "Bearer " + window.accessToken
        },
        data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
        success: function(data) {
          this.setResponse(JSON.stringify(data, undefined, 2));
        }.bind(this),
        error: function() {
          this.setResponse("Internal Server Error");
        }.bind(this)
      });
      this.setResponse("Loading...");
    }

  startRecognition() {
    window.recognition = new window.webkitSpeechRecognition();
    window.recognition.onstart = function(event) {
    };
    window.recognition.onresult = function(event) {
      var text = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          text += event.results[i][0].transcript;
        }
        alert(text);
      this.stopRecognition();
    };

    window.recognition.lang = "en-US";
    window.recognition.start();
  }
  stopRecognition() {
      if (window.recognition) {
        window.recognition.stop();
        window.recognition = null;
      }
      this.send();
    }
    setResponse(val) {
      alert(val);
    }
    switchRecognition() {
      if (window.recognition) {
        this.stopRecognition();
      } else {
        this.startRecognition();
      }
    }

  render() {
    return (
      <div>
      
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css" />
        <iframe id="expediaForm" className="main-website" src="https://www.expedia.com">
          <p>Your browser does not support iframes.</p>
        </iframe>

        <form className="ai-assistant" onSubmit={this.handleAICommand.bind(this)}>
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" id="help" />
            <label className="mdl-textfield__label" htmlFor="help">How can I help...</label>
          </div>
          <i onClick={this.switchRecognition.bind(this)} className="material-icons">mic</i>
        </form>
      </div>
    );
  }
}

export default App;
