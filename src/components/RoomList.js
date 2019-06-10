import React from 'react';

class RoomList extends React.Component{

   

    render(){
        const orderedRooms = [...this.props.rooms].sort((a,b) => a.id -b.id)
        return(
            <div className="rooms-list">
                <h3>Your Rooms:</h3>
                <ul>
                {orderedRooms.map(room => {
                    return(
                        <li key={room.id} className={this.props.roomId===room.id ? "room active" : "room"}>
                            <a href="#" onClick={() => {this.props.subscribeToRoom(room.id)}}># {room.name}</a>
                        </li>
                    )
                })}
                </ul>
            </div>
        )

    }



}

export default RoomList