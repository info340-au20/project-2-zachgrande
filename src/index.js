import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom';
import history from './history.js';
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
// import Firebase, {FirebaseContext} from 'firebase/app';


ReactDOM.render(
  <React.StrictMode>
    <link rel="manifest" href="./public/manifest.json" />
    <Router history={history}>
    {/* <FirebaseContext.Provider value={new Firebase()}> */}
      <App />
    {/* </FirebaseContext.Provider> */}
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
