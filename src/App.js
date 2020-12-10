//import src from '*.avif';
import React, { useState } from 'react';
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';
import NavigationBar from './NavigationBar.js';
import AboutPage from './AboutUs.js';
import Form from './Form.js';
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

  const handleChange = (e) => {
    modifyEntries(e);
  }

  const renderJournalLog = (routerProps) => {
    if (entries.length === 0) {
      return (
        <div>
          <p>You have not created any journal entries!</p>
          <p>You can create an entry by visiting the <NavLink to="create-entry" className="nav-link" activeClassName={"activeLink"}>Create an Entry</NavLink> tab.</p>
        </div>
      )
    } else {
      return <JournalLog {...routerProps} logs={entries} />
    }
  }

  const renderForm = (routerProps) => {
    return <Form {...routerProps} entries={entries} modifyEntries={handleChange} completionAction={sendUserHome} />
  }

  const sendUserHome = () => {
    return <Redirect to="/" />
  }

  return (
    <div className="App">
      <header className="page-header">
        <h1><Link to="/">SongNotes</Link></h1>
        <NavigationBar />
        {/* <div>
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
         </div> */}
        <nav className="row">
          <div className="col-3">
            <Switch>
              <Route exact path="/" render={renderJournalLog} />
              <Route path="/create-entry" render={renderForm} />
              <Route path="/about-us" component={AboutPage} />
              <Redirect to="/" />
            </Switch>
          </div>
        </nav>


      </header>

      <main>
        {/*<JournalLog />
        <LandingPage />
        <AboutPage />*/}
        {/* {pageDisplay} */}
        {/* {console.log("This is what the state looks like right now:")} */}
        {/* {console.log(entries)} */}
      </main>

      <footer>
        <div className="footer-copyright text-center py-3"> &copy; INFO 340 AA -
            {/* <span role="button" className="about-us" onClick={handleNav}> About Us</span> */}
          <NavLink exact to="/about-us" className="nav-link-1" activeClassName={"activeLink"}> About Us</NavLink>

        </div>
      </footer>
    </div>
  );
}

function JournalLog(prop) {
  let count = 0;
  return (
    <section id="journalLog">
      {/* Does not work currently, will be replaced by future sorting options */}
      {/* <div className="btn-group-sm d-flex justify-content-sm-center justify-content-lg-end p-3" role="group" aria-label="viewing mode buttons">
        <button className="btn btn-secondary album-btn">Album Covers</button>
        <button className="btn btn-secondary color-btn">Mood Colors</button>
      </div> */}

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
        <img className="today album-test" src={log.artwork} alt="album cover" />
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

export default App;
