import fetchTrack from './Track.js';
import MoodSelect from './MoodSelect.js';
import { useState } from 'react';

// Similar code is in Form.js, moved here to ensure global variables update
function Form(prop) {

  //pass mood from MoodSelect
  const [moodEntry, setMoodEntry] = useState();
  const handleMoodInput = (e) => {
    setMoodEntry(e);
  }
  console.log(moodEntry);

  // Establish our variables from the prop
  let entries = prop.entries;
  let modifyEntries = prop.modifyEntries;

  // When a user submits the form, modify the state
  let handleSubmit = (event) => {
    event.preventDefault();

    let userTitle = document.querySelector("#inputTitle").value;
    let userDate = document.querySelector("#inputDate").value;
    let userBody = document.querySelector("#inputBody").value;
    let songSearch = document.querySelector('#songSearch').value;

    let newEntriesArray = [];

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

      // Append an additional entry
      newEntriesArray.push({
        postTitle: userTitle,
        date: userDate,
        dayDescription: userBody,
        moodRating: moodEntry,
        artwork: songEntry[0],
        artist: songEntry[1],
        songTitle: songEntry[2]
      });

      // Replace the old state
      modifyEntries(newEntriesArray);
      // prop.completionAction();
      // <Route exact path="/" />
      // console.log(prop.router);
      // prop.routerProps.history.push('/');
    }

    // The final step of our form, ensure nothing is computed until fetch completes
    fetchTrack(songSearch, finalizeUserInput);
  }

  return (
    <section id="landingPage">

      <form>
        <div className="form-group">
          <label htmlFor="inputTitle">Post Title</label>
          <input type="text" className="form-control form-control-lg" id="inputTitle" aria-label="Entry Title" placeholder="What do you want to title this post?" />
        </div>
        <div className="form-group">
          <label htmlFor="inputDate">Day</label>
          <input type="date" id="inputDate" className="form-control form-control-lg" aria-label="Date" required />
          <div id="dateFeedback" className="invalid-feedback"></div>
        </div>
        <div className="form-group">
          <label htmlFor="inputBody">How was your day?</label>
          <textarea className="form-control" id="inputBody" rows="3"></textarea>
        </div>
        <div className="form-group">
          <p role="label">Today's Mood Rating</p>
          <MoodSelect moodEntry={handleMoodInput}/> 
          <div id="moodFeedback" className="invalid-feedback"></div>
        </div>
        <div className="form-group">
          <label htmlFor="songSearch">Search for Today's Song</label>
          <span className="glyphicon glyphicon-search"></span>
          <input className="form-control" type="text" id="songSearch" placeholder="Search" aria-label="Search" />
        </div>
        <button className="btn btn-primary" id="submit" onClick={handleSubmit}>Done</button>
      </form>

    </section>
  )
}

export default Form;