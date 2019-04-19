import React, { Component } from "react";
import Titlebar from "./Titlebar";
import app from "../server/base";

class Main extends Component {
  constructor() {
    super();

    this.database = app.database().ref("currencies");

    this.state = {
      inputQuery: "",
      currencies: [],
      currencyRequested: ""
    };
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
    this.setState({ inputQuery: ev.target.value });
  };

  handleSubmit = ev => {
    // To prevent the page from refreshing itself
    ev.preventDefault();
    // console.log("currenciesQuery=" + this.state.inputQuery);
    // Save the query
    this.setState({ currencyRequested: this.state.inputQuery });

    // TODO: request the query

    // to clear the input box
    this.setState({ inputQuery: "" });

    this.calculateCurrecy(this.state.currencyRequested);
  };

  calculateCurrecy = request => {
    const currencies = this.state.currencies;
    // console.log(currencies);
    currencies.forEach(currency => {
      console.log(currency[0]);
      // if (currency[0] == request) {
      //   console.log("currency=" + currency[1]);
      // }
    });
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
              // console.log(val[1]);
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
                  placeholder="type what currency"
                  value={this.state.inputQuery}
                  onChange={this.handleChange}
                  autoFocus
                />
              </label>

              <input type="submit" value="submit" />
            </form>
            <div>current currency={this.state.currencyRequested}</div>
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
