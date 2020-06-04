import React, { useState, useEffect } from 'react'
import Jitsi from 'react-jitsi'
import logo from './logo.svg'
import './App.css'

const App = () => {
  const [displayName, setDisplayName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [password, setPassword] = useState('')
  const [onCall, setOnCall] = useState(false)
  const [msg, setMsg] = useState('')

  const handleAPI = (JitsiMeetAPI) => {
    JitsiMeetAPI.addEventListeners({
      outgoingMessage: outgoingMessageListener,
      avatarChanged: avatarChangedListenter
    });
    JitsiMeetAPI.executeCommand('toggleVideo')
    JitsiMeetAPI.executeCommand('toggleShareScreen')
  }
  
  const avatarChangedListenter = (e) => {
    console.log('test')
  }
  const outgoingMessageListener = (e) => {
    setMsg(e.message)
  }

  return (
    <div className="App">
      {
        onCall
        ? (
            <div>
              <Jitsi
                  roomName={roomName}
                  displayName={displayName}
                  password={password}
                  onAPILoad={handleAPI}
              />
              {msg}
            </div>)
        : (
            <>
                <h1>Crate a Meeting</h1>
                <input type='text' placeholder='Room name' value={roomName} onChange={e => setRoomName(e.target.value)} />
                <input type='text' placeholder='Your name' value={displayName} onChange={e => setDisplayName(e.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={() => setOnCall(true)}>Start</button>
            </>
        )
      }
    </div>
  )
}

export default App
