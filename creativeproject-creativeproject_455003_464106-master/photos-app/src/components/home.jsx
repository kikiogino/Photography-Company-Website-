import React, { Component } from "react";
import firebaseConfig from "./firebaseConfig";
//import "./home.css";

class Home extends Component {
  state = { photos: [] };
  render() {
    return (
      <React.Fragment>
        <h1>{this.state.count}</h1>
        <button className="btn btn-success btn-sm">Home</button>

        <div id="login_div" class="main-div">
        <h1>Login:</h1>
    <input type="email" placeholder="Email..." id="email_field" />
    <br/>
    <input type="password" placeholder="Password..." id="password_field" />

    <button onclick="login()">Login to Account</button>
  </div>

  <div id="user_div" class="loggedin-div">
    <h3>Welcome User</h3>
    <p id="user_para">Welcome to Firebase web login Example. You're currently logged in.</p>
    <button onclick="logout()">Logout</button>
  </div>
  
      </React.Fragment>
    );
  }
}

export default Home;
