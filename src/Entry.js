import Test from './Test.js';

function Entry(prop) {
  let log = prop.log;
  return (
    <div className="card mb-4">
      <div className={"card-header color " + log.moodRating}>
        <img className="today album-test" src={log.artwork} alt="album cover" />
        <h2 className="entry-title">{log.postTitle}</h2>
        <p className="date">{log.date}</p>
        {/* <p>{log.dayDescription}</p> */}
        <Test></Test>

      </div>
    </div>
  )
}

export default Entry;