import React, { Component } from "react";
import { gapi, loadAuth2 } from "gapi-script";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", photos: [] };
    this.create = this.create.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }
  create() {
    const self = this;
    console.log(self.state.title);
    return gapi.client.photoslibrary.albums
      .create({
        resource: {
          album: {
            isWriteable: true,
            title: self.state.title,
            shareInfo: {
              isOwned: true,
              sharedAlbumOptions: {
                isCollaborative: true,
                isCommentable: true
              }
            }
          }
        }
      })
      .then(
        function(response) {
          const jsonData = JSON.parse(JSON.stringify(response));
          console.log("Response", response);
          alert("Album created");
          alert("View in Google Photos");

          window.open(jsonData.result.productUrl, "Thanks for Visiting!");
        },
        function(err) {
          console.error("Execute error", err);
        }
      );
  }

  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button className="btn btn-primary" onClick={this.create}>
          Create
        </button>
      </React.Fragment>
    );
  }
}

export default Create;
