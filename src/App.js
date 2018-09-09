import React, { Component } from 'react';
import axios from 'axios';
import PhotoList from './PhotoList';

import './App.css';

const search = "flickr.photos.search";
const people = "flickr.people.getInfo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    }
  }

  componentDidMount() {
    this.getPhotoList();
  }
  
  getPhotoList() {
    axios.get(`https://api.flickr.com/services/rest/?method=${search}&api_key=748c099de145d35660505013da5a508a&tags=cats&per_page=100&page=1&format=json&nojsoncallback=1`)
    .then( (response) => {
      this.setState({photos: response.data.photos.photo})
    })
  }


  render() {
    return (
      <div className="App">
        <PhotoList photos={this.state.photos} />
      </div>
    );
  }
}

export default App;
