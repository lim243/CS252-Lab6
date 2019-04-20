import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import Titlebar from "./Titlebar";
import app from "../server/base";

class Main extends Component {
  constructor() {
    super();

    this.database = app.database().ref("currencies");

    this.state = {
      inputQueryBase: 1,
      currencies: [],
      // currencyRequested: "",
      sourceRequest: [],
      targetRequest: [],
      placeholderSource: "Please choose a base currency",
      placeholderRequest: "Please choose a target currency",
      converted: ""
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

      this.setState({ currencies: currencyList });
    });
  }

  componentWillUnmount() {
    //Unmount the database query
    this.database.off();
  }

  handleChangeBase = ev => {
    this.setState({ inputQueryBase: ev.target.value });
  };
  handleChangeTarget = ev => {
    this.setState({ inputQueryTarget: ev.target.value });
  };

  handleSubmit = ev => {
    // To prevent the page from refreshing itself
    ev.preventDefault();

    // Save the query
    this.setState({ currencyRequested: this.state.inputQueryBase });

    // to clear the input box
    this.setState({ inputQueryBase: "" });

    // this.calculateCurrecy(this.state.currencyRequested);
  };

  handleCalculation = ev => {
    if (
      !(
        this.state.sourceRequest.length === 0 ||
        this.state.targetRequest.length === 0
      )
    ) {
      const sourceCurrency = this.state.sourceRequest.value[1];
      const targetCurrency = this.state.targetRequest.value[1];
      const sourceAmount = this.state.inputQueryBase;

      this.calculateCurrecy(sourceCurrency, targetCurrency, sourceAmount);
    } else {
      alert("Please select all choices");
    }
  };

  calculateCurrecy(sourceCurrency, targetCurrency, sourceAmount) {
    console.log(sourceCurrency, targetCurrency);

    const result = (targetCurrency * sourceAmount) / sourceCurrency;
    this.setState({ converted: result });
  }

  dropSourceRequest = target => {
    this.setState({
      sourceRequest: target,
      placeholderSource: target.value[0]
    });
  };

  dropTargetRequest = target => {
    this.setState({
      targetRequest: target,
      placeholderRequest: target.value[0]
    });
  };

  render() {
    return (
      <div>
        {/* Title bar */}
        <Titlebar />

        {/* <NavigationBar /> */}

        {/* For the main input form area */}
        <div style={styles.title}>Hello, {this.props.user.displayName}</div>
        <button onClick={this.props.signOut}>Sign Out PRESSME pls</button>
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
            {/* <Dropdown /> */}
            <form>
              <label>Base currency:</label>
              <input
                placeholder="Amount of base currency"
                style={styles.inputs}
                autoFocus
                type="number"
                // name="email"
                value={this.state.inputQueryBase}
                onChange={this.handleChangeBase}
              />
              <Dropdown
                options={this.state.currencies}
                onChange={this.dropSourceRequest}
                value={this.state.placeholderSource}
              />
              <Dropdown
                options={this.state.currencies}
                onChange={this.dropTargetRequest}
                value={this.state.placeholderRequest}
              />
            </form>
          </div>
          <button onClick={this.handleCalculation}>Convert</button>
        </div>

        <div>Converted: {this.state.converted}</div>
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
