import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Picker } from 'react-native';
import { styles } from './stylesheet';
import Menu from './components/menu';
import Buttons from './components/button';
import Timer from './components/timer';
import Label from './components/label';
import Info from './components/info';
import Picture from './components/picture';
import vibrate from './utils/vibrate';

function leftPadding(n) {
  if (parseInt(n) < 10) {
    return "0" + n.toString();
  } else {
    return n.toString();
  }
}

function getTime(val) {
  return leftPadding(val) + ":00";
}

class App extends React.Component {
  constructor(props) {
    super(props),
    this.state = {
      currentTime: "25:00",
      workTime: "25:00",
      breakTime: "05:00",
      working: true,
      timer: null,
      paused: false,
      playing: false,
    }
    this.setWorkTimer = this.setWorkTimer.bind(this);
    this.setBreakTimer = this.setBreakTimer.bind(this);
    this.playButton = this.playButton.bind(this);
    this.pauseButton = this.pauseButton.bind(this);
    this.resetButton = this.resetButton.bind(this);
    this.countdown = this.countdown.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);

    console.log('++++++++++++++++++++++++++++++++++++++++++++')  
    console.log('constructor: currentTime '+this.state.currentTime)
    console.log('constructor: workTime '+this.state.workTime)
    console.log('constructor: breakTime '+this.state.breakTime)
    console.log('constructor: working '+this.state.working)
    console.log('constructor: timer '+this.state.timer)
    console.log('constructor: paused '+this.state.paused)
    console.log('constructor: playing '+this.state.playing)
    console.log('--------------------------------------------')  
  }
  componentWillMount(){

  }

  componentDidMount() {
    this.setState({
      playButton: this,
      resetButton: this,
      pauseButton: this,
    })

    console.log('componentDidMount: currentTime '+this.state.currentTime)
    console.log('componentDidMount: workTime '+this.state.workTime)
    console.log('componentDidMount: breakTime '+this.state.breakTime)
    console.log('componentDidMount: working '+this.state.working)
    console.log('componentDidMount: timer '+this.state.timer)
    console.log('componentDidMount: paused '+this.state.paused)
    console.log('componentDidMount: playing '+this.state.playing)
    console.log('--------------------------------------------')  

    this.setWorkTimer
  }

  setWorkTimer(val) {
    let newTime = getTime(val);
    this.setState({
      workTime: newTime,
    });
    if (!this.state.timer) {
      this.setState({
        currentTime: newTime,
      });
    }      
  }

  setBreakTimer(val) {
    let newTime = getTime(val);
    this.setState({
      breakTime: newTime,
    });
  }

  playButton() {
    if (this.state.paused === true || this.state.playing === false) { 
      this.setState({
        timer: setInterval(this.countdown, 1000),
        paused: false,
        playing: true,
      });
    }
    console.log('playButton: currentTime '+this.state.currentTime)
    console.log('playButton: workTime '+this.state.workTime)
    console.log('playButton: breakTime '+this.state.breakTime)
    console.log('playButton: working '+this.state.working)
    console.log('playButton: timer '+this.state.timer)
    console.log('playButton: paused '+this.state.paused)
    console.log('playButton: playing '+this.state.playing)
    console.log('--------------------------------------------')  
  }

  pauseButton () {
    if (this.state.paused === false && this.state.playing === true) {
      clearInterval(this.state.timer);
      this.setState({
        paused: false,
        timer: null,
        playing: false
      });
  
    } else if (this.state.paused === true && this.state.playing === false) {
      this.playButton();
    }
    console.log('pauseButton: currentTime '+this.state.currentTime)
    console.log('pauseButton: workTime '+this.state.workTime)
    console.log('pauseButton: breakTime '+this.state.breakTime)
    console.log('pauseButton: working '+this.state.working)
    console.log('pauseButton: timer '+this.state.timer)
    console.log('pauseButton: paused '+this.state.paused)
    console.log('pauseButton: playing '+this.state.playing)
    console.log('--------------------------------------------')       
  }

  resetButton () {
    this.pauseButton();
    
    this.setState({
      currentTime: this.state.workTime,
      playing: false,
      paused: false,
      working: true,
    })
    console.log('resetButton: currentTime '+this.state.currentTime)
    console.log('resetButton: workTime '+this.state.workTime)
    console.log('resetButton: breakTime '+this.state.breakTime)
    console.log('resetButton: working '+this.state.working)
    console.log('resetButton: timer '+this.state.timer)
    console.log('resetButton: paused '+this.state.paused)
    console.log('resetButton: playing '+this.state.playing)
    console.log('--------------------------------------------')  
  }


  countdown() {
    if (this.state.currentTime === "00:00" && this.state.playing === true) {
      console.log('finished');
      vibrate();
      this.toggleStatus();
    } else {
      let sec = this.state.currentTime.slice(3);
      let min = this.state.currentTime.slice(0, 2);
      if (sec === "00") {
        let newMin = leftPadding(parseInt(min) - 1);
        let newTime = newMin + ":59";
        this.setState({
          currentTime: newTime,
        });
      } else {
        let newSec = leftPadding((parseInt(sec) - 1));
        let newTime = min + ":" + newSec;
        this.setState({
          currentTime: newTime,
        })
      }
    }
  }

  toggleStatus() {
    if (this.state.working) {
      this.setState({
        working: false,
        currentTime: this.state.breakTime,
      })
    } else {
      this.setState({
        working: true,
        currentTime: this.state.workTime,
      })
    }
    console.log('resetButton: currentTime '+this.state.currentTime)
    console.log('resetButton: workTime '+this.state.workTime)
    console.log('resetButton: breakTime '+this.state.breakTime)
    console.log('resetButton: working '+this.state.working)
    console.log('--------------------------------------------')  
  }

  render() {
    return (
      <View style={styles.container}>
        <Timer currentTime={this.state.currentTime}/>
        <Label working={this.state.working} paused={this.state.paused} playing={this.state.playing}/>
        <View style={{flexDirection: 'row'}}>
          <Buttons 
            title="Play" 
            onPress={this.playButton} 
          />
          <Buttons 
            title="Pause" 
            onPress={this.pauseButton} 
          />
          <Buttons 
            title="Reset" 
            onPress={this.resetButton} 
          />
        </View>
        <View style={styles.menuContainer}>
          <Text>Select work time (min): </Text>
          <Menu 
            selected={Number(this.state.workTime.slice(0, 2)).toString()}
            onValueChange={this.setWorkTimer}
          />
        </View>
        <View style={styles.menuContainer}>
          <Text>Select break time (min): </Text>
          <Menu 
            selected={Number(this.state.breakTime.slice(0, 2)).toString()}
            onValueChange={this.setBreakTimer}
          />
        </View> 
        <Info />
        <Picture />
      </View>
    );
  }
}

export default App;