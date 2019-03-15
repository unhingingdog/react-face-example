import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import FaceDetector from 'react-face'

const Spinner = ({ x, strength, frequency }) => {
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
          velocity: velocity + (acceleration * (decelerating ? 25 : 1)),
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
      <h2>Move your face to spin.</h2>
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      <header className="App-header">  
        <FaceDetector>
          {data => <Spinner 
            x={data[0].x} 
            strength={data[0].strength}
            frequency={50}
          />}
        </FaceDetector>
      </header>
    </div>
  )
}

export default App;
