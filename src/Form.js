import fetchTrack from './Track.js';
//import MoodSelect from './MoodSelect.js';
import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
// import { Spinner } from 'reactstrap';

function Form(prop) {
  // Establish our variables from the prop
  const user = prop.currentUser;
  let entries = prop.entries;
  // let modifyEntries = prop.modifyEntries;
  let formValid = prop.formValid;

  let entryObj = {
    inputTitle: "",
    inputDate: "",
    inputDescription: "",
    inputSong: "",
  }
  //let hasInput = false
  let entryFormArray = [
    {input: entryObj.inputTitle, err: "",id:"inputTitle", name: "title", type: "text", label: "Post Title", aria: "Entry Title", placeholder: "What do you want to title this post?"},
    {input: entryObj.inputDate,  err: "", id:"inputDate", name: "date", type: "date", label: "Day", aria: "Date"},
    {input: entryObj.inputDescription, err: "", id:"inputDescription", name: "description", type: "text", label: "How was your day?", aria: "Day Description", placeholder: "mm/dd/yyyy"},
    {input: entryObj.inputSong, err: "", id:"inputSong", name: "song",type: "text", label: "Search for Today's Song", aria: "Song Search", placeholder: "Search"},
  ]
 
  // Base appearance of form without error checks  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInvalid, setIsInvalid] = useState("");
  let errorMessage = "";


  function MakeForm() {
    let handleInput = (event) => {
      const inputValue = event.target.value;
      const inputName = event.target.id;

      entryObj[inputName] = inputValue;
        if(!isSubmitted){
          event.target.classList = "form-control form-control-lg";
          errorMessage = "";
        } 
        if(inputValue !== "" && isSubmitted){
          event.target.classList = "form-control form-control-lg is-valid";
          errorMessage = "";
        } 
        if (inputValue === "" && isSubmitted){
          event.target.classList = "form-control form-control-lg is-invalid";
          errorMessage = "Please provide a " + inputName.replace("input", "").toLowerCase() + ".";
        }

      entryFormArray = [
        {input: entryObj.inputTitle, id:"inputTitle", name: "title", type: "text", label: "Post Title", aria: "Entry Title", placeholder: "What do you want to title this post?"},
        {input: entryObj.inputDate,  id:"inputDate", name: "date", type: "date", label: "Day", aria: "Date"},
        {input: entryObj.inputDescription, id:"inputDescription", name: "description", type: "text", label: "How was your day?", aria: "Day Description", placeholder: "mm/dd/yyyy"},
        {input: entryObj.inputSong, id:"inputSong", name: "song",type: "text", label: "Search for Today's Song", aria: "Song Search", placeholder: "Search"},
      ]
    }
    
    let allForm = entryFormArray.map((obj) => {
      let textBox = <div></div>;
      if (obj.id === "inputDescription"){
        if(!isSubmitted) {
        textBox = (
          <textarea className="form-control form-control-lg" id={obj.id} rows="3" aria-label={obj.aria} onChange={handleInput}></textarea>
        )
        }
        if(isSubmitted && isInvalid){
          textBox = (
          <div>
            <textarea className="form-control form-control-lg is-invalid" id={obj.id} rows="3" aria-label={obj.aria} onChange={handleInput}></textarea>
            <div class="invalid-feedback">Please provide a {obj.name}.</div>
          </div>
          )
        } 
        if(isSubmitted && !isInvalid){
          textBox = (
            <textarea className="form-control form-control-lg is-valid" id={obj.id} rows="3" aria-label={obj.aria} onChange={handleInput}></textarea>
          )      
        }
      } else {
        if(!isSubmitted) {
          textBox = (
            <input type={obj.type} className="form-control form-control-lg" id={obj.id} aria-label={obj.aria} placeholder={obj.placeholder} onChange={handleInput} />
          ) 
        }
        if(isSubmitted && isInvalid){
          textBox = (
            <div>
              <input type={obj.type} className="form-control form-control-lg is-invalid" id={obj.id} aria-label={obj.aria} placeholder={obj.placeholder} onChange={handleInput} />
              <div class="invalid-feedback">Please provide a {obj.name}.</div>
            </div>
          )
        } 
        if(isSubmitted && !isInvalid){
          textBox = (
            <input type={obj.type} className="form-control form-control-lg is-valid" id={obj.id} aria-label={obj.aria} placeholder={obj.placeholder} onChange={handleInput} />
          )      
        }
      }
      return (
        <div className="form-group" key={obj}>
            <label htmlFor={obj.id}>{obj.label}</label>
            {textBox}
        </div>
      )
    })

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

    // Error handling
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

      // Append an additional entry to the local state
      newEntriesArray.push(newEntry);

      // ADD A NEW ENTRY TO THE DATABASE
      // Get a reference to the database child
      const entryRef = firebase.database().ref('entries');
      entryRef.push(newEntry);
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
