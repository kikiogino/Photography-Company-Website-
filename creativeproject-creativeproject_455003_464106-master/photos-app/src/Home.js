import React, { Component } from "react";
import "./home.css";
import fire from "./firebase";
import Profile from "./components/google-login";
var Recaptcha = require("react-recaptcha");
class Home_fb extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    fire.auth().signOut();
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div>
        {/* <h1>Welcome to Home</h1> */}
        <button onClick={this.logout}>Logout</button>
        <Profile />
      </div>
    );
  }
}

export default Home_fb;
