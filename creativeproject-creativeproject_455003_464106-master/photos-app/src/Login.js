import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import fire from "./firebase";
var Recaptcha = require("react-recaptcha");

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        console.log(error);
      });
  }

  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .then(u => {
        console.log(u);
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleSubmit(e) {
    e.preventDefault();
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("emailform").value = "";
    document.getElementById("subject").value = "";
    alert("submitted form");
  }
  render() {
    return (
      <React.Fragment>
        <div className="col-md-6">
          <h1>Sign up</h1>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
              <small id="emailHelp" class="form-text text-muted">
                six characters or more
              </small>
            </div>
            <button type="submit" onClick={this.login} class="btn btn-primary">
              Login
            </button>
            <button
              onClick={this.signup}
              style={{ marginLeft: "25px" }}
              className="btn btn-success"
            >
              Signup
            </button>
          </form>
        </div>

        <div id="contact-form" align="center">
          <h1>Contact Form</h1>
          <form>
            <label>First Name</label>
            <br />
            <input
              type="text"
              id="fname"
              name="first_name"
              placeholder="Your name.."
            />
            <br />
            <label>Last Name</label>
            <br />
            <input
              type="text"
              id="lname"
              name="last_name"
              placeholder="Your last name.."
            />
            <br />
            <label>Email</label>
            <br />
            <input
              type="email"
              id="emailform"
              name="email"
              placeholder="Your email"
            />
            <br />
            <label>Subject</label>
            <br />
            <textarea
              id="subject"
              name="comments"
              placeholder="Write something.."
            ></textarea>
            <br />
            <Recaptcha
              sitekey="6Lei7sUUAAAAAA1A_Fn39-mjT-x-BOKplI-RPZuL"
              theme="dark"
            />
            <button className="btn btn-info" onClick={this.handleSubmit}>
              Submit Form
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default Login;
