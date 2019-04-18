import React, { Component } from "react";

class Titlebar extends Component {
  constructor() {
    super();

    this.state = {
      stockName: ""
    };
  }

  render() {
    return <div style={styles.title}>EzCurrencyUp</div>;
  }
}

const styles = {
  title: {
    textAlign: "center",
    color: "black",
    fontWeight: 400,
    lineHeight: "80px",
    fontSize: "2rem",
    backgroundColor: "cornflowerblue"
  }
};

export default Titlebar;
