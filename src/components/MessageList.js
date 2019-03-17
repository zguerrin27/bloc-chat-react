import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            // newMessage: '',
            username: '',
            conent: '',
            sentAt: '',
            roomId: ''

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
        this.setState({ 
            // newMessage: e.target.value,
            username: this.props.user,
            content: e.target.value,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            roomId: this.props.activeRoom
         });
      }

      createMessage(e){
        e.preventDefault();
        if (!this.state.content) { return };
        this.messagesRef.push({ 
            username: this.props.username,
            content: this.state.newMessage,
            roomId: this.state.roomId,
            sentAt: this.state.sentAt            
         });
        this.setState({ username: '', content: '', sentAt: '', roomId: ''  }); 
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
                            value={this.state.content}
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