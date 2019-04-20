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
      // displayName: "",
      loginStatus: false
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        //User is signed in
        this.handleAuthenticate(user);
      }
      //TODO: Check how to logout
    });
  }

  signedIn = () => {
    console.log(this.state.loginStatus);
    return this.state.loginStatus;
  };

  signOut = () => {
    auth.signOut();
    this.afterSignOut();
  };

  handleAuthenticate = user => {
    this.setState({ user, loginStatus: true });
  };

  afterSignOut = () => {
    this.setState({ user: {}, loginStatus: false });
  };

  render() {
    return (
      <div style={styles.website}>
        {this.signedIn() ? (
          <Main user={this.state.user} signOut={this.signOut} />
        ) : (
          // <CreateNewAccount />
          <Login
            user={this.state.user}
            handleAuthenticate={this.handleAuthenticate}
          />
        )}
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
