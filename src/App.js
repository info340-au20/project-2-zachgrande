//import src from '*.avif';
import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';
import NavigationBar from './NavigationBar.js';
import AboutPage from './AboutUs.js';
import Form from './Form.js';
import JournalLog from './JournalLog.js';
import MoodSelect from './MoodSelect.js';
import Expand from './Expand.js'
//import { Button } from 'reactstrap';
import { Spinner } from 'reactstrap';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/auth';
import 'firebase/database';
import { Helmet } from 'react-helmet';


const uiConfig = {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    }
  ],
  credentialHelper: 'none',
  signInFlow: 'popup',
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  }
};

function App() {
  // This is the state of the app, where user journal entries are maintained
  // An entry has several components:
  // - a title
  // - a date
  // - a description
  // - a mood rating
  // - a song
  // [
  // {one entry},
  // {another entry}
  // ]

  // [
  // {user A: [{entry}, {entry}]},
  // {user B: [{entry}, {entry}]}
  // ]
  // const [entries, modifyEntries] = useState({});
  const [entries, modifyEntries] = useState([]);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      // console.log("Logged in as " + firebaseUser.displayName);
      setUser(firebaseUser);
      // const userID = firebaseUser.uid;
      // If our state does NOT contain data for this user
      // if (!Object.keys(entries).includes(userID)) {
      // Then make a new key for our user
      // console.log("Making a new user!");
      // entries[userID] = [];
      // }
      // console.log("Here is our state on load:");
      // console.log(entries);
      setIsLoading(false);
    })

    return function cleanup() {
      authUnregisterFunction();
    }
    // }, []) // only run on first load
  })

  const handleSignOut = () => {
    // setErrorMessage(null);
    firebase.auth().signOut();
  }

  const handleChange = (e) => {
    modifyEntries(e);
  }

  useEffect(() => {
    const entryRef = firebase.database().ref('entries');
    entryRef.on('value', (snapshot) => {
      // If our entries array is empty, then we can't iterate over empty keys
      // This conditional will ensure we skip the following if there are no entries
      // console.log(entries);
      const entriesObj = snapshot.val(); // convert to Javascript value
      // if (entries.length === 0) {
      if (entriesObj === null) {
        modifyEntries([]);
        return null;
      }
      // const entriesObj = snapshot.val(); // convert to Javascript value
      // console.log("Value of database has changed");
      // console.log(entriesObj);
      // The resulting array allows us to render the entries as an array
      // if (entriesObj === undefined) {
      // entriesObj = {};
      // }
      let objectKeys = Object.keys(entriesObj);
      let entriesArray = objectKeys.map((key) => {
        let singleEntryObj = entriesObj[key];
        singleEntryObj.key = key // IMPORTANT
        return singleEntryObj;
      })
      // console.log(entriesArray);
      modifyEntries(entriesArray);
    })
  }, [])

  const renderJournalLog = (routerProps) => {
    const userID = user.uid;
    // console.log("We're trying to find the journal entry length");
    // console.log(userID);
    // console.log(entries[userID]);
    // console.log(Object.values(entries));
    // console.log(entries.userID);
    // if (entries[userID].length === 0) {

    // The array of journal entries for this session's specific user
    let thisEntryArray = [];
    if (entries.length !== 0) {
      for (let i = 0; i < entries.length; i++) {
        let currentEntry = entries[i];
        if (currentEntry.user === userID) {
          thisEntryArray.push(currentEntry);
        }
      }
    }

    if (thisEntryArray.length === 0) {
      return (
        <div>
          <p>You have not created any journal entries! You can create an entry by visiting
            <NavLink to="create-entry" className="nav-link" id="mainCAE" activeClassName={"activeLink"}>Create an Entry</NavLink>
          </p>
        </div>
      )
    } else {
      return <JournalLog {...routerProps} logs={thisEntryArray} currentUser={user} />
    }
  }

  //pass mood from MoodSelect
  const [moodEntry, setMoodEntry] = useState();
  const handleMoodInput = (e) => {
    setMoodEntry(e);
  }
  console.log(moodEntry);
  const renderMoodSelect = (routerProps) => {
    return (
      <div className="form-group">
        <p role="label">Please select a mood for the entry color scheme:</p>
        <MoodSelect {...routerProps} moodEntry={handleMoodInput}/>
        <div id="moodFeedback" className="invalid-feedback"></div>
        <p><Link to="/form">Continue</Link></p> 
      </div>
    )
  }
  
  const renderForm = (routerProps) => {
    return (
      <div>
        <Form {...routerProps} entries={entries} currentUser={user} modifyEntries={handleChange} completionAction={sendUserHome} mood={moodEntry}/>
        <p><Link to="/">go to home</Link></p> 
      </div>
    )
    // return <Form {...routerProps} entries={entries[userID]} currentUser={user} modifyEntries={handleChange} completionAction={sendUserHome} />
  }



  const sendUserHome = () => {
    return <Redirect to="/" />
    // return <Form {...routerProps} entries={entries} modifyEntries={handleChange} completionAction={sendUserHome} />
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner color="primary">
        </Spinner>
        <p>Loading...</p>
      </div>
    )
  }

  let content = null;
  if (!user) {
    content = (
      <div className="container">
        <h1>Sign Up</h1>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    )
  } else {
    content = (
      <div>
        <header className="page-header">
          <h1><Link to="/" id='title'>SongNotes</Link></h1>

          {/* Logout Button */}
          {user &&
            <button className="btn btn-secondary signOutBtn" onClick={handleSignOut}>
              Log Out {user.displayName}
            </button>
          }

          <NavigationBar />
        </header>

        <main>
          <nav className="container-fluid">
            <Switch>
              <Route exact path="/" render={renderJournalLog} />
              <Route path="/create-entry" render={renderMoodSelect} />
              <Route path="/form" render={renderForm} />
              <Route path="/about-us" component={AboutPage} />
              <Route path="/post/:timeStamp" component={Expand} />
              <Redirect to="/" />
            </Switch>
          </nav>
        </main>
      </div>
    )
  }

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>SongNotes</title>
        <meta name="author" content="INFO 340 AA" />
        <meta name="description" content="A Journaling App with Music" />
      </Helmet>

      {content}

      <footer>
        <div className="footer-copyright text-center py-2"> &copy; INFO 340 AA -
          <NavLink exact to="/about-us" className="nav-link-1" activeClassName={"activeLink"} id='footerAU'> About Us</NavLink>
        </div>
      </footer>
    </div>
  );
}

export default App;
