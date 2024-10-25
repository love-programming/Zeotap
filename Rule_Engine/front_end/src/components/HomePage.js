import React, { Component } from "react";
import Navbar from "./Navbar";
import CreatedRule from "../components/CreatedRules";
import CombineRules from "../components/CombineRules";
import EvaluateRules from "../components/EvulateRules";
import UpdateRules from "../components/UpdateRules";
import homeImage from "../home.jpg";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: "home",
    };
  }

  handlePageChange = (page) => {
    this.setState({ selectedPage: page });
  };

  render() {
    const { selectedPage } = this.state;

    const backgroundStyle = {
      backgroundImage: `url(${homeImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
    };

    return (
      <div style={backgroundStyle}>
        <Navbar onPageChange={this.handlePageChange} />
        <div className="homepage-content">
          {selectedPage === "home" && (
            <>
              <p
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "24px",
                  margin: "180px",
                }}
              >
                Welcome to the Rule Engine!
                <br />
                <span
                  style={{
                    fontWeight: "normal",
                    fontSize: "18px",
                    marginTop: "20px",
                    display: "block",
                  }}
                >
                  Empowering you to create, combine, and evaluate rules
                  effortlessly!
                </span>
              </p>
            </>
          )}
          {selectedPage === "createdRules" && <CreatedRule />}
          {selectedPage === "combineRules" && <CombineRules />}
          {selectedPage === "evaluateRules" && <EvaluateRules />}
          {selectedPage === "UpdateRules" && <UpdateRules />}
        </div>
      </div>
    );
  }
}
