import React, { Component } from "react";

import { gapi } from "gapi-script";

class Albums extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <button key={this.props.key}>{this.props.titles}</button>
      </React.Fragment>
    );
  }
}

export default Albums;
