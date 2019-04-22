import React, { Component } from "react";
import app from "../server/base";
import NavigationBarCreate from "./NavigationBarCreate";

class CreateNewAccount extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        email: "",
        displayName: "",
        password: ""
      },
      usersList: []
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
      this.setState({ usersList: userList });
    });
  }

  componentWillUnmount() {
    this.usersList.off();
  }

  //Add new user into the database
  addUser = () => {
    const user = this.state.user;
    const arr = this.state.usersList;

    const pos = arr.map(e => {
      console.log(e[1].email);
      return e[1].email;
    });

    if (pos.indexOf(user.email) === -1) {
      this.usersList.push(user);
      this.props.handleCreateAccount();
    } else {
      alert("User already exist! Please try another email");
    }
  };

  handleChange = ev => {
    //Copy the previous user and update state
    const user = { ...this.state.user };
    user[ev.target.name] = ev.target.value;
    this.setState({ user });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.addUser();
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

        <NavigationBarCreate />

        <div style={styles.body}>
          <main style={styles.main}>
            <form style={styles.form} onSubmit={this.handleSubmit}>
              <h2 style={styles.subTitle}>Create Your EzAccount</h2>

              <div>
                <label style={styles.labels}>Email:</label>

                <input
                  style={styles.inputs}
                  autoFocus
                  type="email"
                  required
                  name="email"
                  value={this.state.userId}
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <label style={styles.labels}>Name:</label>
                <input
                  style={styles.inputs}
                  name="displayName"
                  required
                  value={this.state.userName}
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <label style={styles.labels}>Password:</label>
                <input
                  style={styles.inputs}
                  type="password"
                  name="password"
                  required
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              {/* {this.checkDuplicateUsers()} */}

              <input type="submit" value="Create" style={styles.buttons} />
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

  header: {
    textIndent: "1rem",
    color: "white",
    fontWeight: "450",
    lineHeight: "0%",
    fontSize: "3rem",
    backgroundColor: "black",
    background: "url('HeaderBG.png')",
    fontFamily: "Nanum Pen Script"
  },

  subHeader: {
    textIndent: "15rem",
    color: "white",
    fontWeight: 200,
    lineHeight: "0",
    fontSize: "1.5rem",
    backgroundColor: "black"
  },

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

export default CreateNewAccount;
