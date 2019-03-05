import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);

    this.state = {
        rooms: [],
        name: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  handleChange(e) {
    e.preventDefault();
    const newName = e.target.value;
    this.setState({ name: newName });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({ name: this.state.name });
    this.setState({ name: "" });   
  }

  render() {
    return(
        <div>
            <section>
                <h1>Bloc Chat</h1>
                {
                    this.state.rooms.map(room => (
                        
                            <li key={room.key} >{room.name}</li>
                       
                    ))
                }
            </section>
            <section>
                <form onSubmit={this.createRoom}>
                    <input 
                        type="text" 
                        placeholder="Room Name"
                        value={this.state.name}
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

export default RoomList;