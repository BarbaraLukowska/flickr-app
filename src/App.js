import React, { Component } from 'react';
import axios from 'axios';
import InView from 'react-inview-monitor';
import PhotoList from './PhotoList';

import './App.css';

const search = "flickr.photos.search";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      count: 1
    }
  }

  componentDidMount() {
    this.getPhotoList();
  }
  
  getPhotoList() {
    const {count} = this.state;
    axios.get(`https://api.flickr.com/services/rest/?method=${search}&api_key=748c099de145d35660505013da5a508a&tags=cats&per_page=100&page=${count}&format=json&nojsoncallback=1`)
    .then( (response) => {
      this.setState({photos: response.data.photos.photo})
    })
  }

  loadmore(count) {
    this.setState({
      count: count + 1
    })
  }

  render() {
    const {photos, count} = this.state;
    let maxCount = count > photos.length ? photos.length : count;
    console.log(count)
    console.log(maxCount)
    console.log(photos.length)

    return (
      <div className="App">
        <PhotoList photos={photos} loadmore={this.loadMore} />
        {
          maxCount < photos.length ? <InView onInView={this.loadMore} repeatOnInView>Loading more...</InView> : ''
        }
      </div>
    );
  }
}

export default App;
