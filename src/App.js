import React from 'react';
import MessageList from "./components/MessageList"
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import SendMessageForm from './components/SendMessageForm';
import RoomList from "./components/RoomList"
import NewRoomForm from './components/NewRoomForm';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
        roomId: null,
        messages: [],
        joinableRooms: [],
        joinedRooms: []
    }

    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);

  }

  componentDidMount(){
    const chatManager = new ChatManager({
      instanceLocator: "v1:us1:55f1514d-aaab-4f9f-99f6-1b238780afd0",
      userId: 'Raymie',
      tokenProvider: new TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/55f1514d-aaab-4f9f-99f6-1b238780afd0/token"
      })
    });

    chatManager.connect().then(currentUser => {
        console.log('Successful connection', currentUser)
        this.currentUser = currentUser;

        this.getRooms();


    }).catch(err => console.log('Error connecting' + err))

  }

  getRooms(){
    this.currentUser.getJoinableRooms().then(rooms => {
      this.setState({
        joinableRooms: rooms,
        joinedRooms: this.currentUser.rooms
      })
    }).catch(err => console.log('Error getting joinable rooms' + err))
  }

  subscribeToRoom(roomId){
    this.setState({
      messages: [],
    })
    this.currentUser.subscribeToRoomMultipart({
      roomId: roomId,
      hooks:  {
        onMessage: message => {
          this.setState(prevState => {
            console.log(message)
            return ({
              messages: [...prevState.messages, message]
            })
            
          })
          
        }
      }
    })
    .then(room => {

      this.setState({
        roomId: room.id
      })

      this.getRooms()
    })
    .catch(err => console.log('Error subscribing to room', err))
  }

  createRoom(roomName){
    this.currentUser.createRoom({
      name: roomName
    }).then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log("error creating room", err));
  }

  sendMessage(text){
    this.currentUser.sendMessage({
      text: text,
      roomId: this.state.roomId
    });
  }

  render(){
    return (
    
    <div className="app">
    <RoomList roomId={this.state.roomId} subscribeToRoom={this.subscribeToRoom}
     rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>

     <NewRoomForm createRoom={this.createRoom} />

    <MessageList roomId={this.state.roomId} messages={this.state.messages}/>  
    <SendMessageForm disabled={!this.state.roomId} sendMessage={this.sendMessage}/>
    </div>
  );}
  
}

export default App;
