import React from 'react';

const Image = (props) => {
  
  const { url, name } = props;
  const API_BASE = 'http://localhost:3001/'

  return (
    <div className="image">
      <a href={API_BASE + 'api/uploads/' + name} target="_blank">
        <img src={url} alt={name.split('.')[0]} />
      </a>
    </div>
  )
}

export default Image;