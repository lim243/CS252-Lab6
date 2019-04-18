import React, { Component } from "react";
import Titlebar from "./Titlebar";

class Main extends Component {
  constructor() {
    super();

    this.state = {
      stockName: ""
    };
  }

  handleChange = ev => {
    this.setState({ stockName: ev.target.value });
  };

  handleSubmit = ev => {
    console.log("Submit button pressed!");
    // To prevent the page from refreshing itself
    ev.preventDefault();
  };

  render() {
    return (
      <div>
        {/* Title bar */}
        <Titlebar />

        {/* For the main input form area */}
        <div style={styles.title}>Hello, {this.props.name}</div>
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <label>
            Input:
            <input type="text" name="inputField" onChange={this.handleChange} />
          </label>

          <input type="submit" value="Submit" />
        </form>
        <div>{this.state.stockName}</div>
      </div>
    );
  }
}

const styles = {
  title: {
    color: "cornflowerblue",
    fontWeight: 400,
    textTransform: "uppercase",
    lineHeight: "80px",
    fontSize: "2rem"
  },

  form: {
    fontFamily: "Gentium Book Basic",
    // -webkit-box-sizing: border-box;
    boxSizing: "border-box",
    width: "80%",
    padding: "10px",
    fontSize: "24px",
    backgroundClip: "padding-box",
    borderColor: "rgba(0,0,0,0.25)",
    borderRadius: "5px",
    lineHeight: "20px",
    border: "1px solid #d1d5da",
    margin: "0 auto"
  }
};

export default Main;
