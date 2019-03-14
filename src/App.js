import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FaceDetector from 'react-face'

class Spinner extends Component {
  state = { 
    deg: 0,
    acc: 0
  }

  shouldComponentUpdate(nextProps) {
    return !!nextProps.x
  }

  componentDidUpdate() {
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.setState({
          deg: this.state.deg + this.state.acc,
          acc: ((50 - this.props.x) * -1) / 500
        })
      }, 100)
    })
  }

  render() {
    return(
      <div>
        <img 
          src={logo} 
          className="App-logo" 
          alt="logo" 
          style={{
            transform: `
              rotate(${this.state.deg}deg) 
            `,
            transition: 'transform 0.1s linear'
          }}
        />
        <h2>Move your face to spin.</h2>
        <h3>Face at {this.props.x}.</h3>
      </div>
    )
  }
}

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">  
          <FaceDetector>
            {data => <Spinner x={data[0].x} />}
          </FaceDetector>
        </header>
      </div>
    );
  }
}

export default App;
