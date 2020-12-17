import { useParams } from 'react-router-dom';

function AboutEntry(prop) {
  let entries = prop.entries;
  let urlParams = useParams();
  let entryKey = urlParams.entryKey;
  let entry = {};
  for (let i = 0; i < entries.length; i++) {
    let thisEntryKey = entries[i].key;
    if (entryKey === thisEntryKey) {
      entry = entries[i];
    }
  }
  return (
    <div className="card mb-4">
      <div className={"card-header color " + entry.moodRating}>
        <img className="today album-test" id="about-entry-img" src={entry.artwork} alt="album cover" />
        <h2 className="entry-title">{entry.postTitle}</h2>
        <p className="date">{entry.date}</p>
        <p>{entry.dayDescription}</p>
      </div>
    </div>
  )
}

export default AboutEntry;