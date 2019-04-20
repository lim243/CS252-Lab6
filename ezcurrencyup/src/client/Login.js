import React, { Component } from "react";
import app, { googleProvider, auth } from "../server/base";
import Titlebar from "./Titlebar";
import NavigationBar from "./NavigationBar";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: {
        email: "",
        displayName: "",
        password: ""
      },
      userList: []
    };

    this.authenticate = provider => {
      auth.signInWithPopup(provider);
    };

    this.usersList = app.database().ref("/users");
  }

  componentDidMount() {
    //query to retrieve data from database
    this.usersList.on("value", snap => {
      //Parse incoming data from database
      const userObj = snap.val();

      //Convert incoming object to array
      const userList = Object.keys(userObj).map(function(key) {
        return [key, userObj[key]];
      });

      this.setState({ userList: userList });
    });
  }

  componentWillUnmount() {
    this.usersList.off();
  }

  handleChange = ev => {
    // Copy the previous user and update state
    const user = { ...this.state.currentUser };
    user[ev.target.name] = ev.target.value;
    this.setState({ currentUser: user });
    // const user = { ...this.props.user };
  };

  handleSubmit = ev => {
    ev.preventDefault();

    var flag = false;

    // Current input data
    const userInputEmail = this.state.currentUser.email;
    const userInputPassword = this.state.currentUser.password;

    this.state.userList.forEach(user => {
      const userDataEmail = user[1].email;
      const userDataPassword = user[1].password;
      const userDataDisplayname = user[1].displayName;

      console.log(user[1].displayName);
      if (
        userDataEmail === userInputEmail &&
        userDataPassword === userInputPassword
      ) {
        console.log("Login check sucessful!");

        //Copy the previous data of currentUser
        const currentUser = { ...this.state.currentUser };
        currentUser.displayName = userDataDisplayname; //Update the displayName
        this.setState({ currentUser: {} }); //Reset the currentUser field

        this.props.handleAuthenticate(currentUser); //Call the handle auth function
        flag = true;
        return;
      }
    });

    if (flag === false) {
      alert("Incorrect email or password! Please try again!");
    }
  };

  render() {
    return (
      <div style={styles.signIn}>
        {/* <header style={styles.header}>
          <link
            href="https://fonts.googleapis.com/css?family=Indie+Flower"
            rel="stylesheet"
          />
          <span>
            <p>Ez Currecny Up</p>
            <p style={styles.subHeader}>Make Life Easier.</p>
          </span>
        </header> */}
        <Titlebar />

        {/* <div style={styles.topnav}>
          <a style={styles.topBlock} href="CreateNewAccount.js">
            Create EzAccount
          </a>
          <a style={styles.active} href="Login.js">
            Login EzAccount
          </a>
          <a style={styles.topBlock} href="https://github.com/allen981013">
            About Allen
          </a>
          <a style={styles.topBlock} href="https://github.com/lim243">
            About Andrew
          </a>
        </div> */}
        <NavigationBar />

        <div style={styles.body}>
          <main style={styles.main}>
            <form style={styles.form} onSubmit={this.handleSubmit}>
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
                style={styles.buttons}
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

  body: {
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "black",
    background: "url('BackGround.png')"
  },

  // header: {
  //   textIndent: "1rem",
  //   color: "white",
  //   fontWeight: "450",
  //   lineHeight: "0%",
  //   fontSize: "3rem",
  //   backgroundColor: "black",
  //   background: "url('HeaderBG.png')",
  //   fontFamily: "Nanum Pen Script"
  // },

  // subHeader: {
  //   textIndent: "15rem",
  //   color: "white",
  //   fontWeight: 200,
  //   lineHeight: "0",
  //   fontSize: "1.5rem",
  //   backgroundColor: "black"
  // },

  topnav: {
    width: "100%",
    backgroundColor: "#696969",
    overflow: "auto"
  },

  topBlock: {
    width: "22%",
    float: "left",
    color: "white",
    textAlign: "center",
    padding: "14px 16px",
    textDecoration: "none",
    fontSize: "17px",
    fontFamily: "Indie Flower",
    fontWeight: 600
  },

  active: {
    width: "22%",
    float: "left",
    color: "white",
    textAlign: "center",
    padding: "14px 16px",
    textDecoration: "none",
    fontSize: "17px",
    backgroundColor: "#9932CC",
    fontFamily: "Indie Flower",
    fontWeight: 600
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
    fontFamily: "Indie Flower"
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
    color: "",
    marginColor: "white",
    paddingBottom: "3rem",
    marginTop: "10rem"
  },

  lines: {
    width: "800px",
    height: "1px",
    margin: "0px auto",
    padding: "0px",
    overflow: "hidden"
  },

  buttons: {
    backgroundColor: "#9932CC",
    border: "none",
    color: "white",
    padding: "15px 32px",
    fontSize: "16px",
    margin: "0px 10px"
  }
};

export default Login;
