import fetchTrack from './Track.js';
//import MoodSelect from './MoodSelect.js';
import { useEffect, useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { Link, withRouter } from 'react-router-dom';
import { useHistory } from "react-router";
import firebase from 'firebase/app';
import 'firebase/database';
// import { Spinner } from 'reactstrap';

// Similar code is in Form.js, moved here to ensure global variables update
function Form(prop) {

  const user = prop.currentUser;

  /*//pass mood from MoodSelect 
  //MOVED to App.js
  const [moodEntry, setMoodEntry] = useState();
  const handleMoodInput = (e) => {
    
    setMoodEntry(e);
  }
  console.log(moodEntry);*/

  let entryObj = {
    inputTitle: '',
    inputDate: '',
    inputDescription: '',
    inputSong: '',
  }
  const [entryInput, setEntryInput] = useState(entryObj)
  let handleInput = (event) => {
    const inputValue = event.target.value;
    const inputName = event.target.id;
    entryObj[inputName] = inputValue; 
  }

  // Establish our variables from the prop
  let entries = prop.entries;
  let modifyEntries = prop.modifyEntries;
  let formValid = prop.formValid;


  // MOVED TO JOURNALLOG.JS
  // useEffect(() => {
  //   const entryRef = firebase.database().ref('Person A');
  //   entryRef.on('value', (snapshot) => {
  //     const theValue = snapshot.val(); // convert to Javascript value
  //     console.log("Value of database has changed");
  //     console.log(theValue);
  //   })
  // }, [])

  let errorMessage = '';
  let validation = '';
  let feedbackClasses = '';
  let isDisabled = '';
  let error = false;


  // When a user submits the form, modify the state
  let handleSubmit = (event) => {
    event.preventDefault();
    
    setEntryInput(entryObj);
    //console.log(Object.entries(entryInput));

    //error handling
    /*
    Object.entries(entryInput).map((array) => {
      let key = array[0];
      let value = array[1];
      let keyName = key.replace("input", "").toLowerCase();
      if(value === '') {
        error = true;
        validation = 'is-invalid';
        feedbackClasses = 'invalid-feedback';
        errorMessage = 'Please provide a ' + keyName + '.';
      } else {
        validation = 'is-valid';
        feedbackClasses = 'valid-feedback';
        errorMessage = '';
      }
      
    })

    if (error) {
      isDisabled = "disabled";
    } else {
      isDisabled = "";
    }*/

    /*let userTitle = document.querySelector("#inputTitle").value;
    let userDate = document.querySelector("#inputDate").value;
    let userBody = document.querySelector("#inputDescription").value;
    let inputSong = document.querySelector('#inputSong').value;*/

    let newEntriesArray = [];
    // console.log(entries);

    // Pre-process our existing entries for the new state
    if (entries !== []) {
      newEntriesArray = entries.map((entry) => {
        return entry;
      })
    }

    // Add the final entry to the state and keep the program moving
    const finalizeUserInput = (searchResults) => {
      // Extract the fetch data, top result
      searchResults = searchResults.results[0];

      // Select the song elements to go in the entry
      // [artwork URL, artist name, song title]
      let songEntry = [searchResults.artworkUrl100, searchResults.artistName, searchResults.trackName];

      const newEntry = {
        postTitle: entryInput.inputTitle,
        date: entryInput.inputDate,
        dayDescription: entryInput.inputDescription,
        moodRating: prop.mood,
        artwork: songEntry[0],
        artist: songEntry[1],
        songTitle: songEntry[2],
        time: firebase.database.ServerValue.TIMESTAMP,
        user: user.uid
      }
      //console.log(newEntry);

      // Append an additional entry
      newEntriesArray.push(newEntry);
      // newEntriesArray.push({
      //   postTitle: userTitle,
      //   date: userDate,
      //   dayDescription: userBody,
      //   moodRating: moodEntry,
      //   artwork: songEntry[0],
      //   artist: songEntry[1],
      //   songTitle: songEntry[2]
      // });

      // ADD A NEW ENTRY TO THE DATABASE
      // Get a reference to the database child
      const entryRef = firebase.database().ref('entries'); // change URL to person's user ID
      entryRef.push(newEntry);
      // console.log(user);

      // Replace the old state
      // BRING BACK THE NEXT LINE -- ZACH
      // modifyEntries(newEntriesArray);
      
      // prop.completionAction();
      // <Route exact path="/" />
      // console.log(prop.router);
      // prop.routerProps.history.push('/');
    }

    // The final step of our form, ensure nothing is computed until fetch completes
    fetchTrack(entryInput.inputSong, finalizeUserInput);

  }

  return (
    <section id="landingPage">

      <form>
        <div className="form-group">
          <label htmlFor="inputTitle">Post Title</label>
          <input type="text" className={"form-control form-control-lg " + validation} id="inputTitle" aria-label="Entry Title" placeholder="What do you want to title this post?" onChange={handleInput} />
          <div class={"titleError " + feedbackClasses}>{errorMessage}</div>
        </div>
        <div className="form-group">
          <label htmlFor="inputDate">Day</label>
          <input type="date" id="inputDate" className={"form-control form-control-lg " + validation} aria-label="Date" required onChange={handleInput} />
          <div id="dateFeedback" className="invalid-feedback"></div>
          <div class={"dateError " + feedbackClasses}>{errorMessage}</div>
        </div>
        <div className="form-group">
          <label htmlFor="inputDescription">How was your day?</label>
          <textarea className={"form-control " + validation} id="inputDescription" rows="3" onChange={handleInput}></textarea>
          <div class={"descriptionError " + feedbackClasses}>{errorMessage}</div>
        </div>
        {/*<div className="form-group">
          <p role="label">Today's Mood Rating</p>
          <MoodSelect moodEntry={handleMoodInput}/>
          <div id="moodFeedback" className="invalid-feedback"></div>
        </div>*/}
        <div className="form-group">
          <label htmlFor="inputSong">Search for Today's Song</label>
          <span className="glyphicon glyphicon-search"></span>
          <input className={"form-control " + validation} type="text" id="inputSong" placeholder="Search" aria-label="Search" onChange={handleInput} />
          <div class={"songError " + feedbackClasses}>{errorMessage}</div>
        </div>
  <button className={"btn btn-primary " + isDisabled} id="submit" onClick={handleSubmit} aria-disabled={error}>Done</button>
  <div className="song-loading-spinner disabled">
  </div>
  <div className="errors">
  </div>
      </form>

    </section>
  )
}

export default withRouter(Form);
