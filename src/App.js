import React, { useState } from 'react';
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';
import AboutPage from './AboutUs.js';
//import { Button } from 'reactstrap';

function App() {
  // This is the state of the app, where user journal entries are maintained
  // An entry has several components:
  // - a title
  // - a date
  // - a description
  // - a mood rating
  // - a song
  const [entries, modifyEntries] = useState();


  const [pageDisplay, setPageDisplay] = useState(<JournalLog />)

  const handleNav = (event) => {
    console.log(event);
    console.log(event.currentTarget.classList);
    if (event.currentTarget.classList.contains("homePage")){
      setPageDisplay(<JournalLog />)
    }
    if (event.currentTarget.classList.contains("landingPage")){
      setPageDisplay(<LandingPage />)
    }
    if (event.currentTarget.classList.contains("aboutUs")){
      setPageDisplay(<AboutPage />)
    }
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
            <span role="button" className="aboutUs" onClick={handleNav}> About Us</span>
        </div>
    </footer>
    </div>
  );
}

function JournalLog() {
  return(
    <section id="journalLog">

      <div className="btn-group-sm d-flex justify-content-sm-center justify-content-lg-end p-3" role="group" aria-label="viewing mode buttons">
        <button className="btn btn-secondary album-btn">Album Covers</button>
        <button className="btn btn-secondary color-btn">Mood Colors</button>
      </div>

      <div className="container">    
        <EntryLog />         
      </div> 

    </section>
  )
}

function EntryLog() {
  //placeholder variables for things in the state
  let mood = "calm";
  let album = "img/sample_album_covers/abbeyroad.jpg";
  let entryTitle = "Entry Title";
  let date = "date";
  
  return (
    <div className="card mb-4">
      <div className={"card-header color " + mood}>
        <img className="today album-test" src={album} alt="album cover"/>
        <h2 className="entry-title">{entryTitle}</h2>
        <p className="date">{date}</p>
        <button className="btn btn-secondary">
          Expand
        </button>
      </div>
    </div>
  )
}

function LandingPage() {
  return(
    <section id="landingPage">

      <form>
        <div className="form-group">
          <label for="inputTitle">Post Title</label>
          <input type="text" className="form-control form-control-lg" id="inputTitle" aria-label="Entry Title" placeholder="What do you want to title this post?" />
        </div>
        <div className="form-group">
          <label for="inputDate">Day</label>
          <input type="date" id="inputDate" className="form-control form-control-lg" aria-label="Date" required />
        <div id="dateFeedback" className="invalid-feedback"></div>
            </div>
                <div className="form-group">
                    <label for="inputBody">How was your day?</label>
                    <textarea className="form-control" id="inputBody" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <p role="label">Today's Mood Rating</p>
                    
                    <div className="mood-rating">
                        <div aria-label="calm select" className="moodbtn"><img className="calmbtn" src="img/mood_buttons/calm.jpg" alt="calm" /></div>
                        <div aria-label="happy select" className="moodbtn"><img className="happybtn" src="img/mood_buttons/happy.jpg" alt="happy" /></div>
                        <div aria-label="anxious select" className="moodbtn"><img className="anxiousbtn" src="img/mood_buttons/anxious.jpg" alt="anxious" /></div>
                        <div aria-label="sad select" className="moodbtn"><img className="sadbtn" src="img/mood_buttons/sad.jpg" alt="sad" /></div>
                    </div>
                    <div id="moodFeedback" className="invalid-feedback"></div>
                </div>
                <div className="form-group">
                    <label for="songSearch">Search for Today's Song</label>
                    <span className="glyphicon glyphicon-search"></span>
                    <input className="form-control" type="text" id="songSearch" placeholder="Search" aria-label="Search" />
                </div>
                <button className="btn btn-primary" id="submit">Done</button>
      </form>

    </section>
  )
}

// function AboutPage() {
//   return(
//     <section id="aboutPage">
//       <div className="aboutUs">
//         <img className="aboutpagelogo " src="img/logotransparent.png " alt="black icon of an opened book with a white musical note" />
//         <p> 
//           Sometimes it’s easier to express how you feel with a song.
//         </p>
//         <p>
//           SongNotes is a home for your daily journal, for you to get down your thoughts, how you feel today, and pick a song that “just fits” your mood. SongNotes connects with Spotify to let pick from a vast library of tracks, out of your personal playlists.
//         </p>
//         <p>
//           By the end of the month, we create a song calendar for you to track your mood, and when you like to hear certain songs.
//         </p>
//         <button className="btn btn-primary landingPage"> {/* need to implement an onClick here*/}
//           Make your first note
//         </button>
//       </div>
//     </section>
//   )
// }

export default App;
