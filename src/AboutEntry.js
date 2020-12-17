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
    // Jerray delete all this commented stuff!! 

    // <div className="row">
    //   <div className="card mb-4">
    //     <div className={"card-header color " + entry.moodRating}>
    //       <div className="col">
    //         <img className="today album-test" id="about-entry-img" src={entry.artwork} alt="album cover" />
    //       </div>
    //     </div>
    //     <div>
    //       <h2 className="entry-title">{entry.postTitle}</h2>
    //       <p className="date">{entry.date}</p>
    //       <p>{entry.dayDescription}</p>
    //     </div>
    //   </div>
    // </div>

    <div className="container">
      <div className="card mb-4">
        <div className={"card-header color " + entry.moodRating}>
          <div className="row">
            <img className="today-album-test" id="about-entry-img" src={entry.artwork} alt="album cover" />
            <div className="col">
              <h2 className="entry-title">{entry.postTitle}</h2>
              <div className="row">
                <p className="date">{entry.date}</p>  
              </div>
            </div>
            <div className="col">
              <p className="song-title">Song Title: </p>
              <p className="song">{entry.songTitle}</p>
              <p className="artist-title">Artist Name: </p>
              <p className="artist">{entry.artist}</p>
            </div>
          </div>
        </div>

        <div className="row">
          <h3 className="description-title">Description</h3>
          <p className="description">{entry.dayDescription}</p> 
        </div>
      </div>
    </div>

  )
}

export default AboutEntry;