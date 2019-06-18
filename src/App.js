import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition  from './Components/FaceRecognition/FaceRecognition';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import './App.css';



const app = new Clarifai.App({
  apiKey: 'bfa4e73dbf9448dba2d4ebf505dccdd9'
});

const particlesOptions = {
  "particles": {
    "number": {
        "value": 180,
    },
    "size": {
        "value": 7,
        "random": true,
        "anim": {
            "speed": 20,
            "size_min": 0.3
        }
    },
    "line_linked": {
        "enable": false
    },
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "bubble"
          },
      },
      "modes": {
          "bubble": {
              "distance": 250,
              "duration": 2,
              "size": 0,
              "opacity": 0
          },
          "repulse": {
              "distance": 400,
              "duration": 4
          }
      }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl:'',
    }
  }
  
  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(
      function(response) {
        console.log(response);
      },
      function(err) {
        // there was an error
      }
    );
  }

  render(){
    return (
      <div className="App">
          <Particles className='particles'
            params = {particlesOptions}/>
          <Navigation/>
          <Logo/>
          <Rank/>
          <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
