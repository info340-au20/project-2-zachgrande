//import src from '*.avif';
import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';
import NavigationBar from './NavigationBar.js';
import AboutPage from './AboutUs.js';
import Form from './Form.js';
import JournalLog from './JournalLog.js';
//import { Button } from 'reactstrap';
import { Spinner } from 'reactstrap';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/auth';
import 'firebase/database';

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
  const [entries, modifyEntries] = useState([]);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      // console.log("Logged in as " + firebaseUser.displayName);
      setUser(firebaseUser);
      setIsLoading(false);
    })
  })

  const handleSignOut = () => {
    // setErrorMessage(null);
    firebase.auth().signOut();
  }

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
          <h1><Link to="/">SongNotes</Link></h1>
          {user &&
          <button className="btn btn-primary signOutBtn" onClick={handleSignOut}>
            Log Out {user.displayName}
          </button>
          }
          <NavigationBar />
        </header>

        <main>
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
          {/* {user &&
          <button className="btn btn-primary" onClick={handleSignOut}>
            Log Out {user.displayName}
          </button>
          } */}
        </main>
      </div>
    )
  }

  return (
    <div className="App">
      {/* <header className="page-header">
        <h1><Link to="/">SongNotes</Link></h1>
        <NavigationBar />
      </header>

      <main>
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
      </main> */}
      {content}

      <footer>
        <div className="footer-copyright text-center py-3"> &copy; INFO 340 AA -
            {/* <span role="button" className="about-us" onClick={handleNav}> About Us</span> */}
          <NavLink exact to="/about-us" className="nav-link-1" activeClassName={"activeLink"}> About Us</NavLink>
        </div>
      </footer>
    </div>
  );
}

export default App;
