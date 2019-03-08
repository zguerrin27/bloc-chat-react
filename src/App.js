import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
  apiKey: "AIzaSyAWScxeCTjNAKplI6LPLzbfIj-0_zgttYQ",
  authDomain: "bloc-chat-react-ecfcf.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-ecfcf.firebaseio.com",
  projectId: "bloc-chat-react-ecfcf",
  storageBucket: "bloc-chat-react-ecfcf.appspot.com",
  messagingSenderId: "608738582912"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      activeRoom: null
    };

    this.activeRoom = this.activeRoom.bind(this);
  }

  activeRoom(room){
    this.setState({ activeRoom: room }, ()=>{
      console.log(this.state.activeRoom);
    });
  }


  render() {
    return (
      <div className="App">
        <RoomList 
        firebase={firebase}
        activeRoom={this.activeRoom}
        />
        <MessageList 
        firebase={firebase}
        activeRoom={this.state.activeRoom}
         />
      </div>
    );
  }
}

export default App;
