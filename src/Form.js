import fetchTrack from './Track.js';
//import MoodSelect from './MoodSelect.js';
import { useEffect, useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import firebase from 'firebase/app';
import 'firebase/database';
// import { Spinner } from 'reactstrap';

// Similar code is in Form.js, moved here to ensure global variables update
function Form(prop) {
  // Establish our variables from the prop
  const user = prop.currentUser;
  let entries = prop.entries;
  let modifyEntries = prop.modifyEntries;
  let formValid = prop.formValid;

  let entryObj = {
    inputTitle: '',
    inputDate: '',
    inputDescription: '',
    inputSong: '',
  }
  let entryFormArray = [
    {input: entryObj.inputTitle, id:"inputTitle", name: "title", type: "text", label: "Post Title", aria: "Entry Title", placeholder: "What do you want to title this post?"},
    {input: entryObj.inputDate, id:"inputDate", name: "date", type: "date", label: "Day", aria: "Date"},
    {input: entryObj.inputDescription, id:"inputDescription", name: "description", type: "text", label: "How was your day?", aria: "Day Description", placeholder: "mm/dd/yyyy"},
    {input: entryObj.inputSong, id:"inputSong", name: "song",type: "text", label: "Search for Today's Song", aria: "Song Search", placeholder: "Search"},
  ]
  //const [formState, setFormState] = useState(entryFormArray);
 
  //base appearance of form without error checks  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInvalid, setIsInvalid] = useState(true);

  function MakeForm() {
    let handleInput = (event) => {
      const inputValue = event.target.value;
      const inputName = event.target.id;
      entryObj[inputName] = inputValue; 
      console.log(entryObj);
      entryFormArray = [
        {input: entryObj.inputTitle, id:"inputTitle", name: "title", type: "text", label: "Post Title", aria: "Entry Title", placeholder: "What do you want to title this post?"},
        {input: entryObj.inputDate, id:"inputDate", name: "date", type: "date", label: "Day", aria: "Date"},
        {input: entryObj.inputDescription, id:"inputDescription", name: "description", type: "text", label: "How was your day?", aria: "Day Description", placeholder: "mm/dd/yyyy"},
        {input: entryObj.inputSong, id:"inputSong", name: "song",type: "text", label: "Search for Today's Song", aria: "Song Search", placeholder: "Search"},
      ]
      //console.log(entryFormArray);
      //MakeForm();
  
    }
    
    let allForm = entryFormArray.map((obj) => {
      if (obj.id === "inputDescription"){
        return (
          <div className="form-group">
            <label htmlFor={obj.id}>{obj.label}</label>
            <textarea className="form-control form-control-lg" id={obj.id} rows="3" aria-label={obj.aria} onChange={handleInput}></textarea>
          </div>
        )
      } else {
        if(!isSubmitted) {
          return (
            <div className="form-group">
              <label htmlFor={obj.id}>{obj.label}</label>
              <input type={obj.type} className="form-control form-control-lg" id={obj.id} aria-label={obj.aria} placeholder={obj.placeholder} onChange={handleInput} />
            </div>
          ) 
        }
        if(isSubmitted && isInvalid){
          return (
            <div className="form-group">
              <label htmlFor={obj.id}>{obj.label}</label>
              <input type={obj.type} className="form-control form-control-lg is-invalid" id={obj.id} aria-label={obj.aria} placeholder={obj.placeholder} onChange={handleInput} />
              <div class="invalid-feedback">Please provide a {obj.name}.</div>
            </div>
          )
        } 
        if(isSubmitted && !isInvalid){
          return (
            <div className="form-group">
              <label htmlFor={obj.id}>{obj.label}</label>
              <input type={obj.type} className="form-control form-control-lg is-valid" id={obj.id} aria-label={obj.aria} placeholder={obj.placeholder} onChange={handleInput} />
            </div>
          )      
        } 
      }
    })
    console.log(entryFormArray);

    return (
      <div>
       {allForm} 
      </div>
    )
  }

  
  



  
  let isDisabled = '';
  let error = false;


  // When a user submits the form, modify the state
  let handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    //error handling
    entryFormArray.map((obj) => {
      if(obj.input === '') {
        formValid(false);
        setIsInvalid(true);
      } else {
        formValid(true);
        setIsInvalid(false);
      }
    })


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

      const newEntry = {
        postTitle: entryObj.inputTitle,
        date: entryObj.inputDate,
        dayDescription: entryObj.inputDescription,
        moodRating: prop.mood,
        artwork: songEntry[0],
        artist: songEntry[1],
        songTitle: songEntry[2],
        time: firebase.database.ServerValue.TIMESTAMP,
        user: user.uid
      }
      console.log(newEntry);

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
    fetchTrack(entryObj.inputSong, finalizeUserInput);

  }

  return (
    <section id="landingPage">
      <form>
        <MakeForm />
        <button className={"btn btn-primary " + isDisabled} id="submit" onClick={handleSubmit} aria-disabled={error}>Done</button>
        <div className="song-loading-spinner disabled"></div>
        <div className="errors"></div>
      </form>
    </section>
  )
}

export default Form;
