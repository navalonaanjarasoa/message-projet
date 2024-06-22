import React, { useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import Mess from './Mess';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }

  };  
  
  return (
    <div className="App">
      {!showChat ? (
      <div className='joinChatContainerh3'>
      <h3 >Bienvenue dans le message </h3>
      <p><input className='joinChatContainerinput'
      type="text" 
      placeholder="Nom ..."
      onChange={(event) => {
        setUsername(event.target.value);
        }}
        /></p>
      <p><input className='joinChatContainerinput' 
      type="text" 
      placeholder="Room ID..."
      onChange={(event) => {
        setRoom(event.target.value);
        }}
      /></p>
     <button onClick={joinRoom} className='joinChatContainerbutton'> Join A Room</button>
     </div>
      )
    : (
      <Mess socket={socket} username={username} room={room} />
  )}
    </div>
  );
}

export default App;
