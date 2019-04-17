import React, { Component } from "react";

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <div>
        <header>
          <span>EzCurrencyUp</span>
        </header>

        <main>
          <form>
            <h2>SignIn</h2>

            <label>Email</label>

            <input
              autoFocus
              type="email"
              name="email"
              value={this.state.email}
            />

            <label>Password</label>

            <input
              autoFocus
              type="email"
              name="email"
              value={this.state.password}
            />

            <button type="submit">Sign In</button>
          </form>
        </main>
      </div>
    );
  }
}

const styles = {
  title: {
    textAlign: "center",
    color: "black",
    fontWeight: 400,
    lineHeight: "1.5",
    fontSize: "2rem",
    backgroundColor: "cornflowerblue"
  }
};

export default SignIn;
