import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Button,
  StatusBar
} from "react-native";
import { vibrate } from "./utils";

export class Timer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Timer
        onPress={this.props.toggleTimer}
        title={this.props.isStartBtnToggled ? "Stop" : "Start"}
      />
    );
  }
}
