import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { gapi } from "gapi-script";

import Albums from "./albums";
import Search from "./search";
import Create from "./create-album";
import LoadCalendar from "./load-calendar";

class Profile extends Component {
  constructor(props) {
    super(props);
    const albums = [];
    this.state = {
      isLoggedIn: false,
      albums: false,
      title: [],
      album_ids: [],
      photos: [],
      value: "",
      thumnails: [],
      comment: ""
    };

    this.authenticate = this.authenticate.bind(this);
    this.loadClient = this.loadClient.bind(this);
    this.execute = this.execute.bind(this);
    this.signOut = this.signOut.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.getPhotos = this.getPhotos.bind(this);
    this.loadCalendar = this.loadCalendar.bind(this);
    this.addComment = this.addComment.bind(this);
    this.commentValue = this.commentValue.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
    this.authenticate();
    this.loadClient();
    this.loadCalendar();
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
    this.signOut();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.getPhotos(this.state.value);
    event.preventDefault();
  }
  handleCommentSubmit() {
    this.addComment(this.state.value);
  }
  commentValue(event) {
    this.setState({ comment: event.target.value });
  }

  authenticate() {
    return gapi.auth2
      .getAuthInstance()
      .signIn({
        scope:
          "https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata https://www.googleapis.com/auth/photoslibrary.sharing https://www.googleapis.com/auth/photoslibrary.appendonly https://www.googleapis.com/auth/photoslibrary.readonly https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
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
    return gapi.client
      .load(
        "https://content.googleapis.com/discovery/v1/apis/photoslibrary/v1/rest"
      )
      .then(
        function(response) {
          const token = gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getAuthResponse();

          console.log(token);
        },
        function(response) {
          console.log(response + "GAPI client loaded for API");
        },
        function(err) {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }
  loadCalendar() {
    gapi.client.setApiKey("AIzaSyDlq4CdSVEBM8itkmb_dYqIsYEeEknR36U");
    return gapi.client
      .load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
      .then(
        function(response) {
          const token = gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getAuthResponse();

          console.log(token);
        },
        function(response) {
          console.log(response + "GAPI client loaded for API");
        },
        function(err) {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }
  execute() {
    const self = this;
    return gapi.client.photoslibrary.albums
      .list({
        pageSize: 50
      })
      .then(
        function(response) {
          const jsonData = JSON.parse(JSON.stringify(response));
          console.log("Response", response);
          self.setState({ albums: true });

          const titles = [];
          const length = jsonData.result.albums.length;
          for (let i = 0; i < length; i++) {
            titles.push(jsonData.result.albums[i].title);
          }
          self.setState({ titles: titles });

          const thumnails = [];
          for (let i = 0; i < length; i++) {
            thumnails.push(
              jsonData.result.albums[i].coverPhotoBaseUrl + "=w200-h400"
            );
          }
          self.setState({ thumnails: thumnails });

          const album_ids = [];
          for (let i = 0; i < length; i++) {
            album_ids.push(jsonData.result.albums[i].id);
          }
          self.setState({ album_ids: album_ids });

          const album_urls = [];
          for (let i = 0; i < length; i++) {
            album_urls.push(jsonData.result.albums[i].productUrl);
          }
          self.setState({ album_urls: album_urls });
        },
        function(err) {
          console.error("Execute error", err);
        }
      );
  }
  signOut() {
    return gapi.auth2.getAuthInstance().disconnect();
    console.log("signed out");
  }

  getPhotos(id) {
    console.log(this.state.titles);
    console.log(this.state.album_ids);
    console.log(this.state.value);
    const self = this;
    return gapi.client.photoslibrary.mediaItems
      .search({
        resource: {
          albumId: id
        }
      })
      .then(
        function(response) {
          const jsonData = JSON.parse(JSON.stringify(response));
          console.log("Response", response);

          //   self.setState({ albums: true });
          // Print_albums(jsonData);
          const photos = [];
          const length = jsonData.result.mediaItems.length;
          for (let i = 0; i < length; i++) {
            photos.push(jsonData.result.mediaItems[i].baseUrl + "=w200-h400");
          }
          self.setState({ photos: photos });
        },
        function(err) {
          console.error("Execute error", err);
        }
      );
  }
  addComment(id) {
    console.log(id);
    const self = this;
    return gapi.client.photoslibrary.albums
      .addEnrichment({
        albumId: id,
        resource: {
          newEnrichmentItem: {
            textEnrichment: {
              text: this.state.comment
            }
          },
          albumPosition: {
            position: "LAST_IN_ALBUM"
          }
        }
      })
      .then(
        function(response) {
          const jsonData = JSON.parse(JSON.stringify(response));
          console.log("Response", response);
          alert("Comment Added -- " + self.state.comment);
          alert("View in Google Photos");
          window.open(
            "https://photos.google.com/lr/album/" + self.state.value,
            "Thanks for Visiting!"
          );
        },
        function(err) {
          console.error("Execute error", err);
        }
      );
  }
  componentDidMount() {
    const isLoggedIn = this.state.isLoggedIn;
    if (isLoggedIn) {
      this.execute();
    }
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const albums = this.state.albums;
    let button;
    let execute_btn;
    let items = 0;
    let photos;
    let form;
    let thumnails;
    let search;
    let loadCalendar;
    let createAlbum;
    let comments;
    let routes;
    let link;
    let url;
    let begin;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
      execute_btn = (
        <div>
          <h3>Great! Ready to see some albums?</h3>
          <button className="btn btn-primary" onClick={this.execute}>
            Go to Albums
          </button>
        </div>
      );
      search = <Search />;
      loadCalendar = <LoadCalendar />;
      createAlbum = <Create />;
      routes = (
        <div>
          <li>
            <Link to="/viewalbums">View Albums</Link>
          </li>
          <li>
            <Link to="/searching">Search for photos</Link>
          </li>
          <li>
            <Link to="/addAlbum">Add Albums</Link>
          </li>
          <li>
            <Link to="/meet">Schedule Meeting</Link>
          </li>
        </div>
      );
      begin = "";
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
      execute_btn = "";
      search = "";
      loadCalendar = "";
      createAlbum = "";
      begin = <Home />;
    }
    if (this.state.titles !== undefined && isLoggedIn) {
      items = this.state.titles.map((titles, i) => (
        <option
          key={this.state.album_ids[i]}
          value={this.state.album_ids[i]}
          id={this.state.album_ids[{ i }]}
        >
          {titles}
        </option>
      ));
    } else {
    }

    if (this.state.photos !== undefined && isLoggedIn) {
      photos = this.state.photos.map((photos, index) => (
        <img src={photos} className="rounded mx-auto" height="200" />
      ));
    }
    if (this.state.thumnails !== undefined && isLoggedIn) {
      thumnails = this.state.thumnails.map((thumnails, index) => (
        <span>
          <img className="w-25" src={thumnails}></img>
          <p>{this.state.titles[index]}</p>
        </span>
      ));
    }
    if (items !== 0) {
      form = (
        <form onSubmit={this.handleSubmit}>
          <label>
            Choose Album:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value=""></option>
              {items}
            </select>
          </label>
          <input
            className="btn btn-success"
            type="submit"
            value="View Photos in Album"
          />
        </form>
      );
    }
    if (this.state.value !== "") {
      link = "https://photos.google.com/lr/album/" + this.state.value;
      url = (
        <a target="blank" href={link}>
          View/Upload Photos in Google Photos
        </a>
      );
    }
    if (this.state.value !== "") {
      comments = (
        <div>
          <input
            type="text"
            value={this.state.comment}
            onChange={this.commentValue}
          />
          <button
            className="btn btn-primary"
            onClick={this.handleCommentSubmit}
          >
            Add Comment
          </button>
        </div>
      );
    }

    return (
      <React.Fragment>
        <Router>
          <div>
            <nav>
              {button}
              <ul>{routes}</ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/searching">
                <Searching />
                {search}
              </Route>
              <Route path="/viewalbums">
                <Viewalbums />
                {execute_btn}
                <div className="d-flex flex-wrap my-2">{thumnails}</div>
                {form}
                {url}
                {comments}
                {photos}
              </Route>
              <Route path="/addAlbum">
                <AddAlbums />
                {createAlbum}
              </Route>
              <Route path="/meet">
                <Meet />
                {loadCalendar}
              </Route>
              <Route path="/">{begin}</Route>
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

function LoginButton(props) {
  return (
    <button className="btn btn-info" onClick={props.onClick}>
      Connect to Google Photos
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button className="btn btn-warning" onClick={props.onClick}>
      Disconnect Google Photos
    </button>
  );
}

export default Profile;

function Home() {
  return (
    <div>
      <h2>Before we show you photos we need to connect with google photos. </h2>
      <p>This will allow us to access your albums and add comments</p>
    </div>
  );
}

function Searching() {
  return (
    <div>
      <h2>Search for photos based on filter</h2>
      <p>
        Choose a filter to scan through all your photos. It's a fun and fast way
        to look through them.
      </p>
    </div>
  );
}

function Meet() {
  return <h2>Meet with Nathan and Kiki</h2>;
}
function Viewalbums() {
  return <h2>View Albums</h2>;
}
function AddAlbums() {
  return <h2>Add Albums</h2>;
}
