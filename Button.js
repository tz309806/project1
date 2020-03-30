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

export class CustomButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button
        onPress={this.props.toggleTimer}
        title={this.props.isStartBtnToggled ? "Stop" : "Start"}
      />
    );
  }
}
