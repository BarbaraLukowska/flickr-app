import React from 'react';

const PhotoList = ({photos}) => {
  let items = photos.map(photo => {
    const url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`

    const userInfo = `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;
    return (
      <div key={photo.id}>
        <div className="image" style={{backgroundImage: `url(${url})`}} />
        <p>{photo.title}</p>
      </div>
      );
  });


  return(
    <div className="imgList">
      {
        (photos.length > 0) ? items : []
      }
    </div>
  );
};


export default PhotoList;