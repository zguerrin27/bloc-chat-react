import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);

    this.state = {
        rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  createRoom(newRoomName) {
    this.roomsRef.push({
        name: newRoomName
      });
  }

  render() {
    return(
        <div>
            <section>
                {
                    this.state.rooms.map(room => (
                        <li>{room.name}</li>
                    ))
                }
            </section>
            <section>
                <form onSubmit={this.createRoom}>
                    <input 
                        type="text" 
                        placeholder="Room Name"
                        // value={this.state.rooms}
                        // onChange={this.createRoom}
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