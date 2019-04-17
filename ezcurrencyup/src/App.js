import React, { Component } from "react";
import "./App.css";

import Main from "./Main";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "Andrew"
    };
  }
  render() {
    return <Main name={this.state.user} />;
  }
}

export default App;
