import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import Titlebar from "./Titlebar";
import app from "../server/base";
import "./Main.css";
import NavigationBarMain from "./NavigationBarMain";

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
      converted: "N/A"
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
    // this.getExchangeRates();
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
      <div className="Main">
        {/* Title bar */}
        <Titlebar />
        <NavigationBarMain signOut={this.props.signOut} />

        {/* <NavigationBar /> */}

        {/* For the main input form area */}
        <div className="body" style={styles.body}>
          <div className="title" style={styles.title}>Hello, {this.props.user.displayName}</div>
          {/* <button className="buttons" onClick={this.props.signOut}>
            Sign Out PRESSME pls
          </button> */}

          <div>
            <div style={styles.subTitle}>TODAY'S RATE:    1 USD =</div>

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
          </div>
          <div>
            <div>
              {/* <Dropdown /> */}
              <form>
                <label>Base currency:</label>
                <input
                  placeholder="Amount of base currency"
                  // style={styles.inputs}
                  className="inputs"
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
            {/* <button style={styles.buttons} onClick={this.handleCalculation}> */}
            <button className="buttons" onClick={this.handleCalculation}>
              Convert
            </button>
          </div>

          <div>Converted: {this.state.converted}</div>
        </div>
      </div>
    );
  }
}

const styles = {
  title: {
    position: "absolute",
    left: "auto",
    top: "45px",
    color: "white",
    fontWeight: 400,
    textTransform: "uppercase",
    lineHeight: "80px",
    fontSize: "3.5rem",
    lineHeight:"0",
  },

  subTitle:{
    position: "absolute",
    left: "40px",
    color: "white",
    top: "110px",
    backgroundColor: "#9932CC",
    width: "300px"
  },

  body:{
    position: "relative",
    flex: 1,
    textAlign: "left",
    background: "url('BackGround.png')",
    height:"100vh"
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

export default Main;
