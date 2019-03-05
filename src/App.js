import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
