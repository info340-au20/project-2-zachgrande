import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';
import NavigationBar from './NavigationBar.js';
import AboutPage from './AboutUs.js';
import Form from './Form.js';
import JournalLog from './JournalLog.js';
import MoodSelect from './MoodSelect.js';
import AboutEntry from './AboutEntry.js';
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
  // - a song (artwork, artist name, song title)
  // - a time stamp
  // - a user ID (who posted it)
  const [entries, modifyEntries] = useState([]);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    })

    return function cleanup() {
      authUnregisterFunction();
    }
  })

  const handleSignOut = () => {
    firebase.auth().signOut();
  }

  const handleChange = (e) => {
    modifyEntries(e);
  }

  useEffect(() => {
    const entryRef = firebase.database().ref('entries');
    entryRef.on('value', (snapshot) => {
      const entriesObj = snapshot.val(); // convert to Javascript value
      // If our entries array is empty, then we can't iterate over empty keys
      // This conditional will ensure we skip the following if there are no entries
      if (entriesObj === null) {
        modifyEntries([]);
        return null;
      }
      let objectKeys = Object.keys(entriesObj);
      let entriesArray = objectKeys.map((key) => {
        let singleEntryObj = entriesObj[key];
        singleEntryObj.key = key // IMPORTANT
        return singleEntryObj;
      })
      modifyEntries(entriesArray);
    })
  }, [])

  const renderJournalLog = (routerProps) => {
    const userID = user.uid;

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

  // Pass mood from MoodSelect
  const [moodEntry, setMoodEntry] = useState();
  const handleMoodInput = (e) => {
    setMoodEntry(e);
  }  
  const renderMoodSelect = (routerProps) => {
    function MoodErrorCheck() {
      if(moodEntry === undefined){
        return (<button type="button" className="btn btn-lg btn-secondary" disabled><Link to="/form" onClick={e => e.preventDefault()}>Continue</Link></button>)
      } else {
        return (<button type="button" className="btn btn-lg btn-secondary"><Link to="/form">Continue</Link></button>)
      }
    }
    return (
      <div className="form-group">
        <p role="label">Please select a mood for the entry color scheme:</p>
        <MoodSelect {...routerProps} moodEntry={handleMoodInput}/>
        <div id="moodFeedback" className="invalid-feedback"></div>
        <MoodErrorCheck />
      </div>
    )
  }
  
  const [formValid, setFormValidity] = useState();
  const handleFormValidation = (e) => {
    setFormValidity(e);
  }
  const renderForm = (routerProps) => {
    function FormErrorCheck() {
      if(formValid === false){
        return (<button type="button" className="btn btn-lg btn-secondary" disabled><Link to="/" onClick={e => e.preventDefault()}>Home</Link></button>)
      } else {
        return (<button type="button" className="btn btn-lg btn-secondary"><Link to="/">Home</Link></button>)
      }
    }
    return (
      <div>
        <Form {...routerProps} entries={entries} currentUser={user} completionAction={sendUserHome} mood={moodEntry} formValid={handleFormValidation}/>
        <FormErrorCheck /> 
      </div>
    )
  }

  const renderAboutEntry = routerProps => {
    return (
      <AboutEntry {...routerProps} entries={entries} />
    )
  }


  const sendUserHome = () => {
    return <Redirect to="/" />
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
              <Route path="/post/:entryKey" render={renderAboutEntry} />
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
