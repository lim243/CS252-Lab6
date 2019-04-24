import React, { Component } from "react";

class NavigationBarMain extends Component {
  render() {
    return (
      <div style={styles.title}>
        <div style={styles.topnav}>
          <button style={styles.signOut} onClick={this.props.signOut}>
            Sign Out
          </button>
          <a style={styles.topBlock} href="https://github.com/allen981013">
            About Andrew
          </a>
          <a style={styles.topBlock} href="https://github.com/lim243">
            About Allen
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
    float: "right",
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
    float: "right",
    color: "white",
    textAlign: "center",
    padding: "14px 16px",
    textDecoration: "none",
    fontSize: "17px",
    backgroundColor: "#9932CC",
    fontFamily: "Indie Flower",
    fontWeight: 600
  },

  signOut: {
    backgroundColor: "#696969",
    border: "none",
    width: "22%",
    float: "right",
    color: "white",
    textAlign: "center",
    padding: "14px 16px",
    textDecoration: "none",
    fontSize: "17px",
    fontFamily: "Indie Flower",
    fontWeight: 600
  }
};

export default NavigationBarMain;
