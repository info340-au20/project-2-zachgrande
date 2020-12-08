import { NavLink } from 'react-router-dom';

function AboutPage() {
  return (
    <section id="aboutPage">
      <div className="aboutUs">
        <img className="aboutpagelogo" src="img/logotransparent.png" alt="black icon of an opened book with a white musical note" />
        <p>
          Sometimes it’s easier to express how you feel with a song.
          </p>
        <p>
          SongNotes is a home for your daily journal, for you to get down your thoughts, how you feel today, and pick a song that “just fits” your mood. SongNotes connects with Spotify to let pick from a vast library of tracks, out of your personal playlists.
          </p>
        <p>
          By the end of the month, we create a song calendar for you to track your mood, and when you like to hear certain songs.
          </p>
        <button className="btn btn-primary"> {/* need to implement an onClick here*/}
          <NavLink exact to="/create-entry" className="nav-link-1" activeClassName={"activeLink"}>
            Make your first note
          </NavLink>

        </button>
      </div>
    </section>
  )
}

export default AboutPage;
export { AboutPage };