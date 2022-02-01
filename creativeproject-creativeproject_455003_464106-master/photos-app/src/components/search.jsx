import React, { Component } from "react";
import { gapi, loadAuth2 } from "gapi-script";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "None", photos: [] };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  search() {
    const self = this;

    console.log(this.state.value);
    return gapi.client.photoslibrary.mediaItems
      .search({
        resource: {
          filters: {
            contentFilter: {
              includedContentCategories: [this.state.value]
            },
            mediaTypeFilter: {
              mediaTypes: ["PHOTO"]
            }
          }
        }
      })
      .then(
        function(response) {
          const jsonData = JSON.parse(JSON.stringify(response));
          console.log("Response", response);

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

  render() {
    let photos;
    if (this.state.photos !== undefined) {
      photos = this.state.photos.map((photos, index) => (
        <img src={photos} className="rounded mx-auto" height="250" />
      ));
    }
    return (
      <React.Fragment>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="none"></option>
          <option value="LANDSCAPES">LANDSCAPES</option>
          <option value="CITYSCAPES">CITYSCAPES</option>
          <option value="SELFIES">SELFIES</option>
          <option value="PEOPLE">PEOPLE</option>
          <option value="PETS">PETS</option>
          <option value="WEDDINGS">WEDDINGS</option>
          <option value="BIRTHDAYS">BIRTHDAYS</option>
          <option value="TRAVEL">TRAVEL</option>
          <option value="FOOD">FOOD</option>
          <option value="NIGHT">NIGHT</option>
        </select>
        <button className="btn btn-primary" onClick={this.search}>
          Search
        </button>
        <br></br>
        {photos}
      </React.Fragment>
    );
  }
}

export default Search;
