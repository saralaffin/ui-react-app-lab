import React, { Component } from "react";
import "./Park.css";

class Park extends Component {
  render() {
    return (
      <div className="Park">
        <img src={this.props.imgURL} alt="" />
        <h3 className="active-park">{this.props.name}</h3>
        <p className="active-description">{this.props.description}</p>
      </div>
    );
  }
}

export default Park;
