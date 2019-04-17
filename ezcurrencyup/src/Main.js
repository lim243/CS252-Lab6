import React, { Component } from "react";

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
        <div style={styles.title}>Hello, {this.props.name}</div>
        <form onSubmit={this.handleSubmit}>
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
  }
};

export default Main;
