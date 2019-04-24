import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
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
      loginStatus: false,
      accountCreated: false,
      defaultCurrency: "USD"
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        //User is signed in
        this.handleAuthenticate(user);
      }
    });
  }

  signedIn = () => {
    // console.log(this.state.loginStatus);
    return this.state.loginStatus;
  };

  signOut = () => {
    auth.signOut();

    // reset the login status
    this.setState({ user: {}, loginStatus: false, defaultCurrency: "USD" });
  };

  handleAuthenticate = user => {
    this.setState({ user, loginStatus: true });
  };

  accountCreated = () => {
    return this.state.accountCreated;
  };

  handeCreateNewAccount = () => {
    this.setState({ accountCreated: true });
    alert("Account created!");
  };

  updateDefaultCurrency = currency => {
    this.setState({ defaultCurrency: currency });
  };

  render() {
    return (
      <div style={styles.website}>
        <BrowserRouter>
          <Switch>
            <Route
              path="/login"
              render={() =>
                this.signedIn() ? (
                  <Redirect to="/main" />
                ) : (
                  <Login
                    user={this.state.user}
                    handleAuthenticate={this.handleAuthenticate}
                    updateDefaultCurrency={this.updateDefaultCurrency}
                  />
                )
              }
            />

            <Route
              path="/create-new-account"
              render={() =>
                this.accountCreated() ? (
                  <Redirect to="/main" />
                ) : (
                  <CreateNewAccount
                    handleCreateAccount={this.handeCreateNewAccount}
                  />
                )
              }
            />

            <Route
              path="/main"
              render={navProps =>
                this.signedIn() ? (
                  <Main
                    user={this.state.user}
                    signOut={this.signOut}
                    defaultCurrency={this.state.defaultCurrency}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />

            <Route
              render={() =>
                this.signedIn() ? (
                  <Redirect to="/main" />
                ) : (
                  <Redirect to="login" />
                )
              }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const styles = {
  website: {
    height: "VH"
  }
};

export default App;
