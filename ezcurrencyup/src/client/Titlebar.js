import React, { Component } from "react";

class Titlebar extends Component {
  constructor() {
    super();

    this.state = {
      stockName: ""
    };
  }

  render() {
    return (
      <div style={styles.title}>
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
      </div>
    );
  }
}

const styles = {
  title: {
    display: "flex",
    flexDirection: "column"
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
  }
};

export default Titlebar;
