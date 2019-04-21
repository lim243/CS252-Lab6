import React, { Component } from "react";

class NavigationBarCreate extends Component {
  render() {
    return (
      <div style={styles.title}>
        <div style={styles.topnav}>
          <a style={styles.active} href="create-new-account">
            Create EzAccount
          </a>
          <a style={styles.topBlock} href="login">
            Login EzAccount
          </a>
          <a style={styles.topBlock} href="https://github.com/allen981013">
            About Allen
          </a>
          <a style={styles.topBlock} href="https://github.com/lim243">
            About Andrew
          </a>
        </div>
      </div>
    );
  }
}

const styles = {
  title: {
    display: "flex",
    flexDirection: "column"
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
  }
};

export default NavigationBarCreate;
