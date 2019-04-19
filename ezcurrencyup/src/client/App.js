import React, { Component } from "react";
import "./App.css";

import Main from "./Main";
import Login from "./Login";
import CreateNewAccount from "./CreateNewAccount";
import { auth } from "../server/base";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      displayName: null
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        //User is signed in
        this.handleAuthenticate(user);
      } else {
        //No user is signed in
        this.afterSignOut();
      }
    });
  }

  signedIn = () => {
    return this.state.user.email;
  };

  signOut = () => {
    auth.signOut();
  };

  handleAuthenticate = user => {
    this.setState({ user });
  };

  afterSignOut = () => {
    this.setState({ user: {} });
  };

  render() {
    return (
      <div style={styles.website}>
        {this.signedIn() ? <Main /> : <Login />}
        {/* <Login />
        <CreateNewAccount />
        <Main name={this.state.user} /> */}
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
