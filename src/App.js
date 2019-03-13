import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
      activeRoom: null,
      user: ''
    };

    this.activeRoom = this.activeRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  activeRoom(room){
    this.setState({ activeRoom: room }, ()=>{
      console.log(this.state.activeRoom);
    });
  }

  setUser(user) {
    this.setState({ user: user })
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
         <User
         firebase={firebase}
         setUser={this.setUser}
         user={this.state.user}
          />
      </div>
    );
  }
}

export default App;
