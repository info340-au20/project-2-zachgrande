import React, { useState } from 'react';

function App() {
  // This is the state of the app, where user journal entries are maintained
  // An entry has several components:
  // - a title
  // - a date
  // - a description
  // - a mood rating
  // - a song
  const [entries, modifyEntries] = useState();
  return (
    <div className="App">
      <h1>Start of project!</h1>
    </div>
  );
}

export default App;
