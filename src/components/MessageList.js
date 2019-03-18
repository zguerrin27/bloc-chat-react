import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            roomMessages: [],
            newMessage: ''
        };

        this.messagesRef = this.props.firebase.database().ref('messages');
        this.handleChange = this.handleChange.bind(this);
        this.createMessage = this.createMessage.bind(this);
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
          const message = snapshot.val();
          message.key = snapshot.key;
          this.setState({ messages: this.state.messages.concat( message ) })
        });
      }

      handleChange(e) {
        e.preventDefault();
        this.setState({ newMessage: e.target.value });
      }

      createMessage(e){
        e.preventDefault();
        const date = new Date();
        if (!this.state.newMessage) { return };
        if(!this.props.activeRoom || !this.props.user ) {                     // Logic to make sure user is selecting a room before trying to add a message 
            alert("Please Select a Room and Sign In before adding a message");   // and is signed in 
            this.setState({ newMessage: '' }); 
            return;
         };
        this.messagesRef.push({ 
            content: this.state.newMessage,
            username: this.props.user.displayName,
            roomId: this.props.activeRoom.key,
            sentAt: date.toLocaleTimeString()
         });
        this.setState({ newMessage: '' }); 
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
                <section>
                    <form onSubmit={this.createMessage}>
                        <input 
                            type="text" 
                            placeholder="Enter Message"
                            value={this.state.newMessage}
                            onChange={this.handleChange}
                        />
                        <input 
                            type="submit" 
                            value="Submit"
                        />
                    </form>
                </section>
            </div>
        );
    }
}

export default MessageList;