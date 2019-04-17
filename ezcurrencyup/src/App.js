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
    return (
      <Main />
      // <div className="App">
      //   <header className="App-header">
      //     <p>Hello, {this.state.user}</p>
      //   </header>
      // </div>
    );
  }
}

export default App;
