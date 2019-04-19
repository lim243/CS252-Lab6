import React, { Component } from "react";

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      userName: "",
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
          <span>
            <p>Ez Currecny Up</p>
            <p style={styles.subHeader}>Make Life Easier.</p>
          </span>
        </header>

        <body style={styles.body}>
          <main style={styles.main}>
            <form style={styles.form}>
              <h2 style={styles.subTitle}>
                Sign-In Your EzAccount
              </h2>

              <div>
                <label>
                  Email: 
                </label>

                <input
                autoFocus
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                />
              </div>
            
              <div>
                <label>
                  Password: 
                </label>
                <input
                required
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                />
              </div>

              <button type="submit">
                Sign In
              </button>

            </form>
          </main>
        </body>
      </div>
    );
  }
}

const styles = {
  signIn: {
    display: "flex",
    flexDirection: "column",
  },

  body:{
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor:"black"
  },
  
  main: {
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 auto",
    paddingBottom: "3rem",
  },

  header: {
    textIndent: "1rem",
    color: "white",
    fontWeight: 450,
    lineHeight: "0",
    fontSize: "3rem",
    backgroundColor: "black",
    fontFamily:"Nanum Pen Script",
  },

  subHeader: {
    textIndent: "15rem",
    color: "white",
    fontWeight: 200,
    lineHeight: "0",
    fontSize: "1.5rem",
    backgroundColor: "black"
  },

  subTitle: {
    textAlign: "center",
    color: "white",
    fontWeight: 350,
    fontSize: "3.5rem",
    fontFamily:"Indie Flower",
    backgroundColor:"black"
  },

  form: {
    width: "40rem",
    color:"white",
    backgroundColor: "black",
    marginBottom: "3rem",
    borderColor:"white",
    paddingBottom: "3rem",
    marginTop: "10rem",
  }
};

export default SignIn;
