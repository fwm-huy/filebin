import React, { useState } from 'react';

export default function Upload() {

  const [selected, setSelected] = useState("No file chosen...")

  return (
    <form method="post" encType="multipart/form-data" action="http://localhost:3001/upload">
      <div className="file-upload">
        <div className="file-select">
          <div className="file-select-button" id="fileName">Choose File</div>
          <div className="file-select-name" id="noFile">{selected}</div>
          <input type="file" name="file" id="chooseFile" onChange={(e) => { setSelected(e.target.value.replace('C:\\fakepath\\', '')) }} />
        </div>
      </div>
      <input type="submit" value="Submit" id="submit" />
    </form>
  )
}