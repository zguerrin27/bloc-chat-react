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
    this.chooseRoom = this.chooseRoom.bind(this);
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
    this.setState({ name: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    if (!this.state.name) { return };
    this.roomsRef.push({ name: this.state.name });
    this.setState({ name: '' }); 
  }

  chooseRoom(e, room){
      this.props.activeRoom(room);
  }

  render() {
    return(
        <div>
            <section>
                <h1>Bloc Chat</h1>
                {
                    this.state.rooms.map(room => (
                        
                            <li key={room.key} onClick={(e) => this.chooseRoom(e, room)}> {room.name} </li>
                       
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