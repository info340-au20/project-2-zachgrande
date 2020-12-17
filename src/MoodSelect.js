import { useState } from 'react';

function MoodSelect(props) {
    let moodEntry = props.moodEntry;
    let moodOptions = [
      { id: 'calm', selected: false },
      { id: 'happy', selected: false },
      { id: 'anxious', selected: false },
      { id: 'sad', selected: false }
    ];
  
    const [moodInput, setMoodInput] = useState();
    const handleClick = (event) => {
      let mood = event.currentTarget.classList.value;
      setMoodInput(mood);
    }
    moodEntry(moodInput); //passes moodInput to Form
  
    let selectText = "";
    let clickText = "";
    let moodButtons = moodOptions.map((obj) => {
      if (obj.id === moodInput) {
        obj.selected = true;
      } else {
        obj.selected = false;
      }
      if (obj.selected) {
        selectText = " selected"
        clickText = "_clicked"
      } else {
        selectText = ""
        clickText = ""
      }
      return (
        <div key={obj.id} aria-label={obj.id + "select"} className="moodbtn">
          <img
            onClick={handleClick}
            className={obj.id}
            src={"img/mood_buttons/" + obj.id + clickText + ".jpg"}
            alt={obj.id + selectText}
          />
        </div>
      )
    })
  
    return (
      
      <div className="mood-rating">
        {moodButtons}
      </div>
    )
  }

export default MoodSelect;
export { MoodSelect };