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
      box: {},
    }
  }

  claculateFaceLocation = (data) => {
    const clarifaiFace = (data.outputs[0].data.regions[0].region_info.bounding_box);
    const image = document.getElementById('inputimage');
    const width = Number (image.width);
    const height = Number (image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box:box});
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.displayFaceBox(this.claculateFaceLocation(response)))
      .catch(err => console.log(err))
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
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
