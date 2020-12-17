import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from 'firebase/app';

function Entry(prop) {
  const [redirectTo, setRedirectTo] = useState();
  let log = prop.log;
  const handleClick=() => {
    let redirectCopy = {...redirectTo};
    redirectCopy = "/post/" + log.key;
    setRedirectTo(redirectCopy);
  }

  const handleDeletion = () => {
    const entryRef = firebase.database().ref('entries').child(log.key);
    entryRef.remove();
  }

  if (redirectTo !== undefined) {
    return ( 
      <Redirect push to={redirectTo} log={log}/>
    )
  }

  return (
    // <div className="card clickable mb-4" onClick={handleClick}>
    <div className="card mb-4">
      <div className={"card-header color " + log.moodRating}>
        <img className="today album-test" src={log.artwork} alt="album cover" />
        <h2 className="entry-title">{log.postTitle}</h2>
        <p className="date">{log.date}</p>
        <button className="btn-primary" onClick={handleClick}>Expand</button>
        <button className="btn-secondary" onClick={handleDeletion}>Delete Post</button>
        {/* <img className="trash-can clickable m-1" src="./img/trashcan.png" alt="trash can" onClick={handleDeletion} /> */}
      </div>
    </div>
  )
}

export default Entry;
