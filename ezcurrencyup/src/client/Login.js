import React, { Component } from "react";
import app, { googleProvider, auth } from "../server/base";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        email: "",
        displayName: "",
        password: ""
      },
      userList: {}
    };

    this.authenticate = provider => {
      auth.signInWithPopup(provider);
    };

    this.database = app.database().ref("/users");
  }

  handleChange = ev => {
    //Copy the previous user and update state
    const user = { ...this.state.user };
    user[ev.target.name] = ev.target.value;
    this.setState({ user });
  };

  handleSubmit = ev => {
    ev.preventDefault();
  };

  render() {
    return (
      <div style={styles.signIn}>
        <header style={styles.header}>
          <link
            href="https://fonts.googleapis.com/css?family=Indie+Flower"
            rel="stylesheet"
          />
          <span>
            <p>Ez Currecny Up</p>
            <p style={styles.subHeader}>Make Life Easier.</p>
          </span>
        </header>

        <div style={styles.lines} />

        <div style={styles.body}>
          <main style={styles.main}>
            <form style={styles.form}>
              <h2 style={styles.subTitle}>Login Your EzAccount</h2>

              <div>
                <label style={styles.labels}>Email:</label>

                <input
                  style={styles.inputs}
                  autoFocus
                  type="email"
                  name="email"
                  value={this.state.userId}
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <label style={styles.labels}>Password:</label>
                <input
                  style={styles.inputs}
                  required
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>

              <button style={styles.buttons} type="submit">
                Login
              </button>
              <button
                type="button"
                onClick={() => this.authenticate(googleProvider)}
              >
                Sign In with GOOGLE
              </button>
            </form>
          </main>
        </div>
      </div>
    );
  }
}

const styles = {
  signIn: {
    display: "flex",
    flexDirection: "column"
  },

  lines: {
    width: "800px",
    height: "1px",
    margin: "0px auto",
    padding: "0px",
    overflow: "hidden"
  },

  body: {
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "black"
    //border: "1px solid white"
  },

  header: {
    textIndent: "1rem",
    color: "white",
    fontWeight: 450,
    lineHeight: "0%",
    fontSize: "3rem",
    backgroundColor: "black",
    fontFamily: "Nanum Pen Script"
    //border: "1px solid white"
  },

  subHeader: {
    textIndent: "15rem",
    color: "white",
    fontWeight: 200,
    lineHeight: "0",
    fontSize: "1.5rem",
    backgroundColor: "black"
  },

  main: {
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 auto",
    paddingBottom: "3rem"
  },

  subTitle: {
    textAlign: "center",
    color: "white",
    fontWeight: 300,
    fontSize: "3rem",
    fontFamily: "Indie Flower",
    backgroundColor: "black"
  },

  labels: {
    color: "white",
    fontWeight: 450,
    fontFamily: "Indie Flower",
    lineHeight: "4rem"
  },

  inputs: {
    padding: "7px 10px",
    width: "30%",
    margin: "0px 20px"
  },

  form: {
    width: "40rem",
    color: "white",
    backgroundColor: "black",
    marginColor: "white",
    paddingBottom: "3rem",
    marginTop: "10rem"
  },

  buttons: {}
};

export default Login;
