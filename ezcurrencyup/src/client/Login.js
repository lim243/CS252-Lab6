import React, { Component } from "react";
import app from "../server/base";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      userId:"",
      password: ""
    };

    this.users = app.database().ref("users");
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
          <link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">
          </link>
          <span>
            <p>Ez Currecny Up</p>
            <p style={styles.subHeader}>Make Life Easier.</p>
          </span>
        </header>

        <div style={styles.lines}></div>

        <div style={styles.body}>
          <main style={styles.main}>
            <form style={styles.form}>
              <h2 style={styles.subTitle}>
                Create Your EzAccount
              </h2>

              <div>
                <label style={styles.labels}>
                  Email: 
                </label>

                <input style={styles.inputs}
                autoFocus
                type="email"
                name="email"
                value={this.state.userId}
                onChange={this.handleChange}
                />
              </div>

              <div>
                <label style={styles.labels}>
                  Name: 
                </label>
                <input style={styles.inputs}
                required
                value={this.state.userName}
                onChange={this.handleChange}
                />
              </div>
            
              <div>
                <label style={styles.labels}>
                  Password: 
                </label>
                <input style={styles.inputs}
                required
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                />
              </div>

              <button style={styles.buttons} type="submit">
                Create
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
    flexDirection: "column",
  },

  lines:{
    width:"800px",
    height:"1px",
    margin:"0px auto",
    padding:"0px",
    overflow:"hidden"
  },

  body:{
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor:"black",
    //border: "1px solid white"
  },

  header: {
    textIndent: "1rem",
    color: "white",
    fontWeight: 450,
    lineHeight: "0%",
    fontSize: "3rem",
    backgroundColor: "black",
    fontFamily:"Nanum Pen Script",
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
    paddingBottom: "3rem",
  },

  subTitle: {
    textAlign: "center",
    color: "white",
    fontWeight: 300,
    fontSize: "3rem",
    fontFamily:"Indie Flower",
    backgroundColor:"black"
  },

  labels:{
    color: "white",
    fontWeight: 450,
    fontFamily:"Indie Flower",
    lineHeight: "4rem"

  },

  inputs:{
    padding: "7px 10px",
    width:"30%",
    margin:"0px 20px"
  },

  form: {
    width: "40rem",
    color:"white",
    backgroundColor: "black",
    marginColor:"white",
    paddingBottom: "3rem",
    marginTop: "10rem",
  },

  buttons:{

  }
};

export default Login;
