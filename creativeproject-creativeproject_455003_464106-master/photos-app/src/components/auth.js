import React, { Component } from "react";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  authenticate() {
    return gapi.auth2
      .getAuthInstance()
      .signIn({
        scope:
          "https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.readonly https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata"
      })
      .then(
        function() {
          console.log("Sign-in successful");
        },
        function(err) {
          console.error("Error signing in", err);
        }
      );
  }
  loadClient() {
    gapi.client.setApiKey("AIzaSyDlq4CdSVEBM8itkmb_dYqIsYEeEknR36U");
    gapi.load("client:auth2", function() {
      gapi.auth2.init({
        client_id:
          "644256627327-lokkdfnf4tsd6eofhijirqd17ie741l3.apps.googleusercontent.com"
      });
    });
    return gapi.client
      .load(
        "https://content.googleapis.com/discovery/v1/apis/photoslibrary/v1/rest"
      )
      .then(
        function() {
          console.log("GAPI client loaded for API");
        },
        function(err) {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }
  render() {
    return (
      <button onclick="authenticate().then(loadClient)">
        authorize and load
      </button>
    );
  }
}

export default LogIn;

// // Make sure the client is loaded and sign-in is complete before calling this method.
// function execute() {
//   return gapi.client.photoslibrary.albums
//     .list({
//       pageSize: 50
//     })
//     .then(
//       function(response) {
//         // Handle the results here (response.result has the parsed body).
//         console.log("Response", response);
//       },
//       function(err) {
//         console.error("Execute error", err);
//       }
//     );
// }
