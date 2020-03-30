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
import { CustomButton } from './Button';
import moment from 'moment';

export default class App extends React.Component {
  constructor() {
    super();
    work = this.state = { 
      isStartBtnToggled: false, 
      workCounter: 0, 
      playCounter: 0,
      eventDate: moment.duration().add({days: 0, hours: 0, minutes: 40, seconds: 0}),
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    play = this.state = { 
      isStartBtnToggled: false, 
      workCounter: 0, 
      playCounter: 0,
      eventDate: moment.duration().add({days: 0, hours: 0, minutes: 5, seconds: 0}),
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  render() {


    const play = { days, hours, mins, secs } = this.state
    const work = { days, hours, mins, secs } = this.state
    

    return (
      <ScrollView style={styles.appContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Pomodoro Timer</Text>
          <View style={styles.row}>
            <Text>{`${work.days} : ${work.hours} : ${work.mins} : ${work.secs}`}</Text>
            <CustomButton title= {this.state.isStartBtnToggled} onPress= {this.toggleTimer}/>
            <Button title="Reset" onPress={this.resetWorkTimer} />
          </View>
          <View style={styles.row}>
            <Text>{`${play.days} : ${play.hours} : ${play.mins} : ${play.secs}`}</Text>
            <Button
              onPress={this.toggleTimer}
              title={this.state.isStartBtnToggled ? "Stop" : "Start"}
            />
            <Button title="Reset" onPress={this.resetWorkTimer} />
          </View>
        </View>
      </ScrollView>
    );
  }

  toggleTimer = () => {
    this.setState({ isStartBtnToggled: !this.state.isStartBtnToggled });
    // if(isStartBtnToggled==='true') {

    // }
  };

  resetWorkTimer = () => {
    this.setState({workCounter: 0})
  }

  componentDidMount() {
    this.setWorkTimer()
  }

  setWorkTimer = () => {

    const x = setInterval(() => {
      let {eventDate} = this.state
      if(eventDate <=0) {
        clearInterval(x)
      }else{
        eventDate = eventDate.subtract(1, 's')
        const days = eventDate.days()
        const hours = eventDate.hours()
        const mins = eventDate.minutes()
        const secs = eventDate.seconds()

work = this.setState({
  days, hours, mins, secs, eventDate,
})

play = this.setState({
  days, hours, mins, secs, eventDate,
})
      }
    }, 1000)

    // this.setState({ workCounter: this.state.workCounter + 1 });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  appContainer: {
    paddingTop: StatusBar.currentHeight
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30
  },

  row: { alignItems: "center", flex: 1, flexDirection: "row" }
});
