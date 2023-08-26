/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { View } from "react-native";

class Line extends Component<any, any> {
  render() {
    return (
      <View
        style={{
          width: "100%",
          height: this.props.height || 1,
          backgroundColor: this.props.color || "#d3dfe4",
          marginLeft: this.props.marginLeft || 0,
          ...this.props.style,
        }}
      />
    );
  }
}
export default Line;
