import Entry from './Entry.js';

function JournalLog(prop) {
  let user = prop.currentUser;
  let count = 0;
  let logList = prop.logs.map((log) => {
    count++;
    return <Entry key={count} log={log} />
  })
  return (
    <section id="journalLog">
      {/* Does not work currently, will be replaced by future sorting options */}
      {/* <div className="btn-group-sm d-flex justify-content-sm-center justify-content-lg-end p-3" role="group" aria-label="viewing mode buttons">
          <button className="btn btn-secondary album-btn">Album Covers</button>
          <button className="btn btn-secondary color-btn">Mood Colors</button>
        </div> */}

      <div className="container">
        {logList}
      </div>

    </section>
  )
}

export default JournalLog;