import React, { Component } from 'react';
import * as firebase from 'firebase';


class User extends Component {
    constructor(props){
        super(props);

        this.state = {
            userName: ''
        }

    // this.signIn = this.singIn.bind(this);      why doesnt this work... but the fat arrow function in the render does?
    this.signOut = this.singOut.bind(this);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
          this.props.setUser(user);
          let newUser = firebase.auth().currentUser;
          if (newUser) {
            this.setState({ userName : this.props.user.displayName})
          } else {
            this.setState({ userName: "Guest" })
          }
        });
    }

    signIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    singOut() {
        this.props.firebase.auth().signOut();
    }


    render() {
        return(
            <div>
            <h1>{this.state.userName}</h1>
            <button onClick={() => this.signIn()}>Sign in</button>
            <button onClick={this.signOut}>Sign out</button>
            </div>
        );
    }
}

export default User;