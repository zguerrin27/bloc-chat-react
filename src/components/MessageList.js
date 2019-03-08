import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            roomMessages: []
        };

        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
          const message = snapshot.val();
          message.key = snapshot.key;
          this.setState({ messages: this.state.messages.concat( message ) })
        });
      }


    render(){
        return(
            <div id="message-list" >
                <h1>{(this.props.activeRoom) ? `${this.props.activeRoom.name} Messages` : 'Please Select a Room to See Messages'}</h1>
            <section>
                {   // eslint-disable-next-line
                    this.state.messages.map(message => (this.props.activeRoom && message.roomId == this.props.activeRoom.key) ? <li key={message.key} > {message.content} </li> : '')
                }
            </section>
      </div>
        );
    }
}

export default MessageList;