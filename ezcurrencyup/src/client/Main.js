import React, { Component } from "react";
import Titlebar from "./Titlebar";
import app from "../server/base";

class Main extends Component {
  constructor() {
    super();

    this.database = app.database().ref("currencies");

    this.users = app.database().ref("users");

    this.state = {
      currencies: [],
      currentCurrency: ""
    };
  }

  //TODO: Delete after, just for testing purposes
  //  Add user data to database for
  addUsers() {
    const data = {
      uid: "123-A",
      username: "Andrew"
    };

    this.users.push(data);
  }

  componentDidMount() {
    //query to retrieve data from database
    this.database.on("value", snap => {
      //Parse incoming data from database
      const currencyObj = snap.val();

      //Convert incoming object to array
      const currencyList = Object.keys(currencyObj).map(function(key) {
        return [key, currencyObj[key]];
      });

      // console.log(currencyList);

      this.setState({ currencies: currencyList });
    });
  }

  handleChange = ev => {
    this.setState({ currencies: ev.target.value });
  };

  handleSubmit = ev => {
    console.log("Submit button pressed!");
    // To prevent the page from refreshing itself
    ev.preventDefault();

    // to copy the previous currencies and adding new one
    const currencies = [...this.state.currencies]; //copy the current ones
    currencies.push({
      currencyName: "USD"
    });

    this.setState(currencies);
  };

  render() {
    return (
      <div>
        {/* Title bar */}
        <Titlebar />

        {/* For the main input form area */}
        <div style={styles.title}>Hello, {this.props.name}</div>

        <div>Requested currencies</div>

        <div>
          <ul>
            {this.state.currencies.map(val => {
              console.log(val[1]);
              return (
                <li key={val[0]}>
                  {val[0]}: {val[1]}
                </li>
              );
            })}
          </ul>

          <div>
            Input form:
            <form style={styles.form} onSubmit={this.handleSubmit}>
              <label>
                Input:
                <input
                  type="text"
                  name="inputField"
                  onChange={this.handleChange}
                />
              </label>

              <input
                type="submit"
                value="Submit"
                onSubmit={this.handleSubmit}
              />
            </form>
          </div>
        </div>
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
