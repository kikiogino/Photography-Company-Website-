import React, { Component } from "react";
import { gapi, loadAuth2 } from "gapi-script";

class LoadCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      title: "",
      start: "",
      end: "",
      created: false,
      loaded: false
    };

    this.calendarConnect = this.calendarConnect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.loadCalendar = this.loadCalendar.bind(this);
  }

  handleClick(event) {
    this.calendarConnect();
    event.preventDefault();
  }
  handleStart(event) {
    this.setState({ start: event.target.value });
  }
  handleEnd(event) {
    this.setState({ end: event.target.value });
  }
  loadCalendar() {
    const self = this;
    gapi.client.setApiKey("AIzaSyDlq4CdSVEBM8itkmb_dYqIsYEeEknR36U");
    return gapi.client
      .load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
      .then(
        function(response) {
          const token = gapi.auth2.getAuthInstance().currentUser.get();
          const jsonData = JSON.parse(JSON.stringify(token));
          //   console.log(jsonData);
          self.setState({ email: jsonData.w3.U3 });
          self.setState({ loaded: true });
          //   console.log(jsonData.w3.U3);
        },
        function(response) {
          //   self.setState({ email: "yo" });
        },
        function(err) {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }
  calendarConnect() {
    console.log(this.state.email);
    const self = this;
    return gapi.client.calendar.events
      .insert({
        calendarId: this.state.email,
        resource: {
          end: {
            date: this.state.end
          },
          start: {
            date: this.state.start
          },
          summary: "Meeting with Nathan and Kiki"
        }
      })
      .then(
        function(response) {
          const jsonData = JSON.parse(JSON.stringify(response));
          console.log(response);
          self.setState({ created: true });
        },
        function(err) {
          console.error("Execute error", err);
        }
      );
  }

  render() {
    let done;
    let loaded;
    if (this.state.loaded) {
      if (this.state.created) {
        done = (
          <div>
            <p>Event created! </p>
            <a
              target="_blank"
              href="https://www.google.com/calendar/event?eid=cGMxMWJxMXNlZzJkNTUzOW4xc28wNmtpcDggbmF0aGFua2F0ejExQG0"
            >
              View event here
            </a>
          </div>
        );
      } else {
        done = (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-12">
                <form method="post">
                  <div className="form-group">
                    <label className="control-label" for="date">
                      Create an all-day event to meet with Kiki and Nathan
                    </label>
                    <input
                      className="form-control"
                      id="date"
                      name="date"
                      placeholder="Start date: YYYY-MM-DD"
                      type="text"
                      onChange={this.handleStart}
                    />
                    <input
                      className="form-control"
                      id="enddate"
                      name="enddate"
                      placeholder="End date: YYYY-MM-DD"
                      type="text"
                      onChange={this.handleEnd}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-primary "
                      onClick={this.handleClick}
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      }
    } else {
      loaded = (
        <div>
          <h3>We're going to schedule a meeting to meet</h3>
          <p>
            This is a photo sharing site, but we want to take photos in person
          </p>
          <button className="btn btn-success" onClick={this.loadCalendar}>
            Schedule meeting
          </button>
        </div>
      );
    }
    return (
      <React.Fragment>
        {done}
        {loaded}
      </React.Fragment>
    );
  }
}

export default LoadCalendar;
