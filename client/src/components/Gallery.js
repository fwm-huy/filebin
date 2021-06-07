import React, { useState, useEffect } from 'react';
import Image from './Image';

export default function Gallery() {

  const [files, updateFiles] = useState([]);

  useEffect(() => {
    getFiles();
  }, []);

  async function getFiles() {
    const res = await fetch('http://localhost:3001/');
    const json = await res.json();
    updateFiles(json.files);
  }

  const mapFiles = files.map((file, index) => {
    return (
      <Image url={`http://localhost:3001/api/uploads/${file}`} key={index} name={file} />
    )
  });

  return (
    <div id="gallery">
      { mapFiles }
    </div>
  )
}