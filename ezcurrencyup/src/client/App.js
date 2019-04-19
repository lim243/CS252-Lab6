import React, { Component } from "react";
import "./App.css";

import Main from "./Main";
import SignIn from "./SignIn";

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
        <SignIn />
        {/* <Main name={this.state.user} /> */}
      </div>
    );
  }
}

const styles = {
  website:{
    height:"100%"
  }
};

export default App;
