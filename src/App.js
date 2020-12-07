import React, { useState } from 'react';
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';
import AboutPage from './AboutUs.js';
import Form from './Form.js';
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
      setPageDisplay(<Form />)
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

export default App;
