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
      sourceRequest: {},
      targetRequest: {},
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
      this.setState({ currencyObj });

      //Convert incoming object to array
      const currencyList = Object.keys(currencyObj).map(function(key) {
        return [key, currencyObj[key]];
      });

      this.setState({ currencies: currencyList });
    });

    // console.log(this.props.defaultCurrency);
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
    // console.log(target);
    this.setState({
      sourceRequest: target,
      placeholderSource: target.value[0]
    });
    this.props.updateDefaultCurrency(target.value[0]);
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
        <link
          href="https://fonts.googleapis.com/css?family=Amatic+SC"
          rel="stylesheet"
        />
        {/* Title bar */}
        <Titlebar />
        <NavigationBarMain signOut={this.props.signOut} />

        {/* For the main input form area */}
        <div className="body" style={styles.body}>
          <div className="title" style={styles.title}>
            Hello, {this.props.user.displayName}
          </div>

          <div>
            <div style={styles.subTitle}>TODAY'S RATE: 1 USD =</div>

            <ul style={styles.tables}>
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
          <div style={styles.currencySelect}>
            <div>
              {/* <Dropdown /> */}
              <form>
                <label style={styles.labels}>Base currency:</label>
                <input
                  style={styles.inputs}
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
                  value={this.props.defaultCurrency}
                />
                <Dropdown
                  options={this.state.currencies}
                  onChange={this.dropTargetRequest}
                  value={this.state.placeholderRequest}
                />
              </form>
            </div>
            <button
              className="buttons"
              onClick={this.handleCalculation}
              style={styles.buttons}
            >
              Convert
            </button>
          </div>

          <div style={styles.result}>Converted: {this.state.converted}</div>
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
    lineHeight: "0",
    fontFamily: "Amatic SC"
  },

  subTitle: {
    position: "absolute",
    left: "40px",
    color: "white",
    top: "100px",
    width: "300px",
    fontSize: "2rem",
    margin: "0px 10px",
    border: "none",
    padding: "15px 32px",
    fontFamily: "Amatic SC",
    fontWeight: "450"
  },

  body: {
    position: "relative",
    flex: 1,
    textAlign: "left",
    background: "url('BackGround.png')",
    height: "100vh"
  },

  tables: {
    fontFamily: "Amatic SC",
    fontWeight: "450",
    position: "absolute",
    color: "white",
    left: "40px",
    top: "130px",
    fontSize: "2rem"
  },

  inputs: {
    borderRadius: "10px",
    fontSize: "1rem",
    padding: "10px 10px",
    borderColor: "white",
    position: "absolute",
    top: "27px",
    left: "135px"
  },

  currencySelect: {
    fontFamily: "Amatic SC",
    fontWeight: "450",
    position: "absolute",
    color: "white",
    left: "500px",
    top: "150px",
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
  },

  labels: {
    lineHeight: "3"
  },

  buttons: {
    position: "absolute",
    backgroundColor: "#9932CC",
    top: "230px",
    left: "-10px",
    border: "none",
    color: "white",
    padding: "15px 32px",
    fontSize: "16px",
    margin: "0px 10px"
  },

  result: {
    fontFamily: "Amatic SC",
    position: "absolute",
    color: "white",
    top: "130px",
    fontSize: "1rem",
    left: "500px",
    fontSize: "2rem"
  }
};

export default Main;
