import React, { Component } from "react";
import "./App.css";

import Main from "./Main";
import Login from "./Login";
import CreateNewAccount from "./CreateNewAccount";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "Andrew"
    };
  }
  render() {
    return (
      <div style={styles.website}>
        <CreateNewAccount />
        {/* <Main name={this.state.user} /> */}
      </div>
    );
  }
}

const styles = {
  website: {
    height: "100%"
  }
};

export default App;
