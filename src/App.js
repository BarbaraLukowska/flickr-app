import React, { Component } from 'react';
import axios from 'axios';
import PhotoList from './PhotoList';
import ReactPaginate from 'react-paginate';

import './App.css';

const search = "flickr.photos.search";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      maxCount: 0,
      maxPages: null
    }
  }

  componentDidMount() {
    this.getPhotoList();
  }

  getPhotoList(d) {
    console.log(d)
    axios.get(`https://api.flickr.com/services/rest/?method=${search}&api_key=748c099de145d35660505013da5a508a&tags=cats&per_page=20&page=${d}&format=json&nojsoncallback=1`)
    .then( (response) => {
      this.setState({
        photos: response.data.photos.photo,
        maxPages: response.data.photos.pages
      })
    })
  }

  handlePageClick(data){
    console.log(data);
    this.getPhotoList(data.selected+1);
  }

  render() {
    const {photos, maxPages} = this.state;

    return (
      <div className="App">
        <PhotoList photos={photos} loadmore={this.loadMore} />
        <ReactPaginate
          pageCount={maxPages}
          pageRangeDisplayed={10}
          marginPagesDisplayed={2}
          nextLabel={"next"}
          breakLabel={<a href="">...</a>}
          onPageChange={(d) => this.handlePageClick(d)}
          />
      </div>
    );
  }
}

export default App;
