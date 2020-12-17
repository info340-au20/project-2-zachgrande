import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom';
import history from './history.js';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
{/* <script src="https://www.gstatic.com/firebasejs/8.2.0/firebase-analytics.js"></script> */ }

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Old firebaseConfig
// const firebaseConfig = {
//   apiKey: "AIzaSyCZyzL8yth7VmE8mOG1T75ztM0v3SAMzFg",
//   authDomain: "info-340-project-2-6e95f.firebaseapp.com",
//   projectId: "info-340-project-2-6e95f",
//   storageBucket: "info-340-project-2-6e95f.appspot.com",
//   messagingSenderId: "588622978497",
//   appId: "1:588622978497:web:c8a160b8f8bfdede12a340",
//   measurementId: "G-02TNKY9483"
// };
// New firebaseConfig
var firebaseConfig = {
  apiKey: "AIzaSyDLW7GAG9SkF5e9wsCfph8RpDtAK19HIWk",
  authDomain: "info-340-project-2-final-2c408.firebaseapp.com",
  databaseURL: "https://info-340-project-2-final-2c408-default-rtdb.firebaseio.com",
  projectId: "info-340-project-2-final-2c408",
  storageBucket: "info-340-project-2-final-2c408.appspot.com",
  messagingSenderId: "680903552538",
  appId: "1:680903552538:web:c6c514990b5b2967f1aba3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
