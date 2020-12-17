import Entry from './Entry.js';

function JournalLog(prop) {
  let count = 0;
  let logList = prop.logs.map((log) => {
    count++;
    return <Entry key={count} log={log} />
  })
  return (
    <section id="journalLog">
      <div className="container">
        {logList}
      </div>

    </section>
  )
}

export default JournalLog;