function Form() {
    return(
      <section id="landingPage">
  
        <form>
          <div className="form-group">
            <label for="inputTitle">Post Title</label>
            <input type="text" className="form-control form-control-lg" id="inputTitle" aria-label="Entry Title" placeholder="What do you want to title this post?" />
          </div>
          <div className="form-group">
            <label for="inputDate">Day</label>
            <input type="date" id="inputDate" className="form-control form-control-lg" aria-label="Date" required />
          <div id="dateFeedback" className="invalid-feedback"></div>
              </div>
                  <div className="form-group">
                      <label for="inputBody">How was your day?</label>
                      <textarea className="form-control" id="inputBody" rows="3"></textarea>
                  </div>
                  <div className="form-group">
                      <p role="label">Today's Mood Rating</p>
                      
                      <div className="mood-rating">
                          <div aria-label="calm select" className="moodbtn"><img className="calmbtn" src="img/mood_buttons/calm.jpg" alt="calm" /></div>
                          <div aria-label="happy select" className="moodbtn"><img className="happybtn" src="img/mood_buttons/happy.jpg" alt="happy" /></div>
                          <div aria-label="anxious select" className="moodbtn"><img className="anxiousbtn" src="img/mood_buttons/anxious.jpg" alt="anxious" /></div>
                          <div aria-label="sad select" className="moodbtn"><img className="sadbtn" src="img/mood_buttons/sad.jpg" alt="sad" /></div>
                      </div>
                      <div id="moodFeedback" className="invalid-feedback"></div>
                  </div>
                  <div className="form-group">
                      <label for="songSearch">Search for Today's Song</label>
                      <span className="glyphicon glyphicon-search"></span>
                      <input className="form-control" type="text" id="songSearch" placeholder="Search" aria-label="Search" />
                  </div>
                  <button className="btn btn-primary" id="submit">Done</button>
        </form>
  
      </section>
    )
  }
export default Form;