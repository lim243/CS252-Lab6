import React, { Component } from "react";
import Titlebar from "./Titlebar";
import app from "../server/base";
// import Dropdown from "./Dropdown";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
// import { auth } from "../server/base";

class Main extends Component {
  constructor() {
    super();

    this.database = app.database().ref("currencies");

    this.state = {
      // inputQuery: "",
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

  handleChange = ev => {
    this.setState({ inputQuery: ev.target.value });
  };

  handleSubmit = ev => {
    // To prevent the page from refreshing itself
    ev.preventDefault();

    // Save the query
    this.setState({ currencyRequested: this.state.inputQuery });

    // to clear the input box
    this.setState({ inputQuery: "" });

    // this.calculateCurrecy(this.state.currencyRequested);
  };

  //TODO: calculate currency

  handleCalculation = ev => {
    // ev.preventDefault();

    // console.log(!this.state.sourceRequest);
    // console.log(!this.state.targetRequest);
    // if (!this.state.sourceRequest) {
    //   if(!this.state.targetRequest) {
    //   console.log("Im not empty!");

    //TODO: Check if input choice is not empty
    const source = this.state.sourceRequest.value[1];
    const target = this.state.targetRequest.value[1];
    this.calculateCurrecy(source, target);
    // } else {
    //   console.log("Please choose both options!");
    // }
  };

  calculateCurrecy(source, target) {
    console.log(source, target);

    const result = target / source;
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

  // dropOnChange = target => {
  //   const currencyName = target.value[0];
  //   const currencyVal = target.value[1];
  //   this.setState({ dropdownSelection: currencyVal });

  //   // this.calculateCurrecy(currencyVal);
  // };

  render() {
    return (
      <div>
        {/* Title bar */}
        <Titlebar />

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
          </div>

          <button onClick={this.handleCalculation}>Calculate</button>

          {this.state.converted}
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
