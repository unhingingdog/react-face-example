import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import FaceDetector from 'react-face'

const Spinner = ({ x, strength, frequency, detectorActive }) => {
  const [spinnerState, setSpinnerState] = useState({
    degrees: 0,
    velocity: 0,
    acceleration: 0
  })

  const { degrees, velocity, acceleration } = spinnerState

  const decelerating = velocity < 0 ?
      (velocity + acceleration) > velocity :
      (velocity + acceleration) < velocity

  useEffect(() => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        setSpinnerState({
          acceleration: strength > 100 ? 
            (((50 - x) * -1) / 100) : acceleration,
          velocity: detectorActive ? 
            velocity + (acceleration * (decelerating ? 25 : 1)) : velocity,
          degrees: degrees + velocity
        })
      })
    }, frequency)
  }, [spinnerState])

  return(
    <div>
      <img 
        src={logo} 
        className="App-logo" 
        alt="logo" 
        style={{
          transform: `
            rotate(${spinnerState.degrees}deg) 
          `,
          transition: `transform ${frequency / 1000}s linear`
        }}
      />
    </div>
  )
}

const App = () => {
  const [canvasVisible, setCanvasVisibility] = useState(false)
  const [detectorActive, setDetectionActive] = useState(true)

  const toggleCanvasVisibility = () => setCanvasVisibility(!canvasVisible)
  const toggleDetection = () => setDetectionActive(!detectorActive)

  return (
    <div className="App">
      <header className="App-header">  
        <FaceDetector showCanvas={canvasVisible} active={detectorActive}>
          {data => <Spinner 
            x={data[0].x} 
            strength={data[0].strength}
            frequency={50}
            detectorActive={detectorActive}
          />}
        </FaceDetector>
        <h2>Move your face to spin.</h2>
        <div style={{ display: 'flex' }}>
          <button onClick={toggleDetection}>
            {detectorActive ? "Stop detection": "Start detection"}
          </button>
          <button onClick={toggleCanvasVisibility}>
            {canvasVisible ? "Hide canvas" : "Show canvas"}
          </button>
        </div>
      </header>
    </div>
  )
}

export default App;
