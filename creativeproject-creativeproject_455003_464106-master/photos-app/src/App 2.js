import React, { Component } from "react";

import Profile from "./components/google-login";
import Albums from "./components/albums";
import fire from './firebase';
import Home_fb from './Home';
import Login from './Login';



class App extends Component {

  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <div className="App">
         {this.state.user ? (
          <Home_fb />
        ) :
          (
            <Login />
          )}
      

      </div>
      
    );
  }
}

export default App;
