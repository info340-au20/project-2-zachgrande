//import src from '*.avif';
import React, { useState } from 'react';
// import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';
import AboutPage from './AboutUs.js';
import {renderTrack, fetchTrack} from './Track.js';
//import Form from './Form.js';
//import { Button } from 'reactstrap';

function App() {
  // This is the state of the app, where user journal entries are maintained
  // An entry has several components:
  // - a title
  // - a date
  // - a description
  // - a mood rating
  // - a song
  const [entries, modifyEntries] = useState([]);

  const [pageDisplay, setPageDisplay] = useState();

  const handleNav = (event) => {
    if (event.currentTarget.classList.contains("homePage")){
      setPageDisplay(<JournalLog logs={entries}/>)
    }
    if (event.currentTarget.classList.contains("landingPage")){
      setPageDisplay(<Form entries={entries} modifyEntries={handleChange} />)
    }
    if (event.currentTarget.classList.contains("about-us")){
      console.log(entries);
      setPageDisplay(<AboutPage />)
    }
  }

  const handleChange = (e) => {
    console.log("Adding this to state", e);
    modifyEntries(e);
    
  }

  return (
    <div className="App">
      <header className="page-header">
        <h1>SongNotes</h1>

        {/*<NavBar />*/}
        <div>
          <nav>
            <ul>
              <li>
                <img 
                  className="icon homePage" 
                  role="button" 
                  src="img/logotransparent.png" 
                  alt="logo"
                  onClick={handleNav}
                />
              </li>
              <li>
                <button className="btn btn-primary btn-lg landingPage" onClick={handleNav}>
                  Make Entry
               </button>
              </li>
            </ul>
          </nav>
         </div>


      </header>

      <main>
        {/*<JournalLog />
        <LandingPage />
        <AboutPage />*/}
        {pageDisplay}
      </main>

      <footer>
        <div className="footer-copyright text-center py-3"> &copy; INFO 340 AA -
            <span role="button" className="about-us" onClick={handleNav}> About Us</span>
        </div>
    </footer>
    </div>
  );
}

function JournalLog(prop) {
  let count = 0;
  return(
    <section id="journalLog">

      <div className="btn-group-sm d-flex justify-content-sm-center justify-content-lg-end p-3" role="group" aria-label="viewing mode buttons">
        <button className="btn btn-secondary album-btn">Album Covers</button>
        <button className="btn btn-secondary color-btn">Mood Colors</button>
      </div>

      <div className="container">    
        {prop.logs.map((log) => {
            count++;
            return <EntryLog key={count} log={log} />
          })}      
      </div> 

    </section>
  )
}

function EntryLog(prop) {
  let log = prop.log;
  return (
    <div className="card mb-4">
      <div className={"card-header color " + log.mood}>
        <img className="today album-test" src={log.album} alt="album cover"/>
        <h2 className="entry-title">{log.postTitle}</h2>
        <p className="date">{log.date}</p>
        <p>{log.dayDescription}</p>
        <button className="btn btn-secondary">
          Expand
        </button>
      </div>
    </div>
  )
}

// Similar code is in Form.js, moved here to ensure global variables update
function Form(prop) {
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

    if (entries !== []) {
      newEntriesArray = entries.map((entry) => {
        return entry;
      })
    }
    
    // APPEND an additional entry
    newEntriesArray.push({
      postTitle: userTitle,
      date: userDate,
      dayDescription: userBody,
      //moodRating: moodInput,
      song: fetchTrack(songSearch)
    })

    // Replace the old state
    modifyEntries(newEntriesArray);
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
          {/*<div className="mood-rating">
            <div aria-label="calm select" className="moodbtn"><img onClick={handleClick} className="calmbtn" src="img/mood_buttons/calm.jpg" alt="calm" /></div>
            <div aria-label="happy select" className="moodbtn"><img onClick={handleClick} className="happybtn" src="img/mood_buttons/happy.jpg" alt="happy" /></div>
            <div aria-label="anxious select" className="moodbtn"><img onClick={handleClick} className="anxiousbtn" src="img/mood_buttons/anxious.jpg" alt="anxious" /></div>
            <div aria-label="sad select" className="moodbtn"><img onClick={handleClick} className="sadbtn" src="img/mood_buttons/sad.jpg" alt="sad" /></div>
          </div>*/}
          <MoodSelect />
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

function MoodSelect() {

  let moodOptions = [
    {id:'calm', selected:false},
    {id:'happy', selected:false},
    {id:'anxious', selected:false},
    {id:'sad', selected:false} 
  ];

  const [moodInput, setMoodInput] = useState();
  const handleClick = (event) => {
    let mood = event.currentTarget.classList.value;
    //event.currentTarget.src = "img/mood_buttons/" + mood + "_clicked" + ".jpg";
    //event.currentTarget.alt = mood + "selected"; 
    setMoodInput(mood);
  }
  // console.log(moodInput) //need to pass this to the parent component

  let selectText = "";
  let clickText = "";
  let moodButtons = moodOptions.map((obj) => {
    if(obj.id === moodInput){
      obj.selected = true;
    } else {
      obj.selected = false;
    }
    if (obj.selected) {
      selectText = " selected"
      clickText = "_clicked"
    } else {
      selectText = ""
      clickText = ""
    }
    return (
      <div aria-label={obj.id + "select"} className="moodbtn">
        <img 
          onClick={handleClick} 
          className={obj.id} 
          src={"img/mood_buttons/"+ obj.id + clickText + ".jpg"} 
          alt={obj.id + selectText}
        />
      </div>
    )
  })
  
  return (
    <div className="mood-rating">
      {moodButtons}
    </div>
  )
}

export default App;
