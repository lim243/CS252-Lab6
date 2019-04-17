import React, { Component } from "react";

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    const newValue = {};
    newValue[event.target.name] = event.target.value;
    this.setState(newValue);
  };

  render() {
    return (
      <div style={styles.signIn}>
        <header style={styles.header}>
          <span>EzCurrencyUp</span>
        </header>

        <main style={styles.main}>
          <form style={styles.form}>
            <h2 style={styles.subTitle}>SignIn</h2>

            <label>Email</label>

            <input
              autoFocus
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />

            <label>Password</label>

            <input
              required
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />

            <button type="submit">Sign In</button>
          </form>
        </main>
      </div>
    );
  }
}

const styles = {
  signIn: {
    display: "flex",
    flexDirection: "column"
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

  header: {
    textAlign: "center",
    color: "black",
    fontWeight: 400,
    lineHeight: "1.5",
    fontSize: "2rem",
    backgroundColor: "cornflowerblue"
  },

  subTitle: {
    textAlign: "center",
    color: "black",
    fontWeight: 300,
    fontSize: "3rem"
  },

  form: {
    width: "40rem",
    backgroundColor: "white",
    boxShadow: "0 1px 1px rgba(0,0,0,.1)",
    marginBottom: "2rem",
    paddingBottom: "2rem",
    marginTop: "10rem"
  }
};

export default SignIn;
