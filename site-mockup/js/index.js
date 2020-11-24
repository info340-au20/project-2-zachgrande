//Page navigation interaction
let calendarPage = document.querySelector('#calendarPage');
let landingPage = document.querySelector('#landingPage');
landingPage.style.display = "none";
let aboutPage = document.querySelector('#aboutPage');
aboutPage.style.display = "none";
let headerText = document.querySelector('h1');

let toHome = document.querySelector('.home-page');
toHome.addEventListener('click', function(){
  calendarPage.style.display = "block";
  landingPage.style.display = "none";
  aboutPage.style.display = "none";
  headerText.textContent = "Welcome to SongNotes";
})

let makeEntry = document.querySelector('.make-entry');
makeEntry.addEventListener('click', function(){
  calendarPage.style.display = "none";
  landingPage.style.display = "block";
  aboutPage.style.display = "none";
  headerText.textContent = "Create Today's Journal Entry";
  clearAllMood();
  document.querySelector("#inputTitle").value = "";
  document.querySelector("#inputDate").value = "";
  document.querySelector("#inputBody").value = "";
  document.querySelector("#songSearch").value = "";
})

let aboutUs = document.querySelector('.about-us');
aboutUs.addEventListener('click', function(){
  calendarPage.style.display = "none";
  landingPage.style.display = "none";
  aboutPage.style.display = "block";
  headerText.textContent = "About SongNotes";
})

// This array represents a user's journal entries. The first element represents the first day of the calendar month, etc.
const JOURNAL_ENTRIES = {entries:[{
    postTitle: "First Journal Entry",
    date: "",
    dayDescription: "This is text for testing purposes.",
    moodRating: "happy",//10,
    song:[{
        artistName: "Queen",
        trackName: "Bohemian Rhapsody",
        previewUrl: "https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music3/v4/41/cc/ae/41ccae59-697a-414c-43b5-51bd4d88d535/mzaf_3150742134610995145.plus.aac.p.m4a",
        artworkUrl100: "http://is3.mzstatic.com/image/thumb/Music1/v4/94/92/a3/9492a374-e6e3-8e92-0630-a5761070b0f7/source/100x100bb.jpg",
    }]
    }, {
    postTitle: "Second Journal Entry",
    date: "",
    dayDescription: "This is text for testing purposes.",
    moodRating: "calm",//7,
    song:[{
        artistName: "David Bowie",
        trackName: "Starman (2012 Remastered Version)",
        previewUrl: "https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview71/v4/d2/68/ea/d268ea6a-9e8b-fc0b-f519-0e8b59fd9a18/mzaf_6387986799378989474.plus.aac.p.m4a",
        artworkUrl100: "http://is3.mzstatic.com/image/thumb/Music6/v4/ab/4e/d9/ab4ed977-4b96-4791-bcec-e02c94283332/source/100x100bb.jpg",
    }]
    }, {
    postTitle: "Third Journal Entry",
    date: "",
    dayDescription: "This is text for testing purposes.",
    moodRating: "happy",//9,
    song:[{
        artistName: "Beyoncé",
        trackName: "Formation",
        previewUrl: "https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview122/v4/5f/d7/5f/5fd75fd8-d0a5-ccb2-7822-bcaedee070fc/mzaf_3356445145838692600.plus.aac.p.m4a",
        artworkUrl100: "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    }]
}]};

//Sets interactivity for mood buttons in form
//mood rating states
let moodSelect = [
      {id:'calm', selected:false},
      {id:'happy', selected:false},
      {id:'anxious', selected:false},
      {id:'sad', selected:false} 
    ];

function clearAllMood(){
  moodSelect.forEach(function(obj){
    obj.selected = false;
    let imgElem = document.querySelector('.' + obj.id + 'btn');
    imgElem.src = "img/mood_buttons/" + obj.id + ".jpg";
    imgElem.alt = obj.id;
  });
}

function renderMoodSelection(selection, obj){
    selection.src = "img/mood_buttons/" + obj.id + "_clicked.jpg";
    selection.alt = obj.id + " selected";  
}

//function for changing visuals upon rating
moodSelect.forEach(function(obj) {
  let moodElem = document.querySelector('.' + obj.id + 'btn');
  console.log(moodElem);
  moodElem.addEventListener('click', function(){
    clearAllMood();
    renderMoodSelection(moodElem, obj); 
    obj.selected = true;
  });
});

//function for setting mood of 'today' entry for calendar and JOURNAL_ENTRIES
let moodInput = "";
function getTodayMood(){
  moodSelect.forEach(function(obj) {
    if(obj.selected === true){
      console.log(obj.id);
      let today = document.querySelector('.today');
      today.classList.add(obj.id); //adds mood class to today for background color
      moodInput = obj.id;
    /*} else {
      moodInput = '';*/
    }
  });
}



// This function takes a track and creates an album cover to add to the DOM.
function renderTrack(track) {
    let newTrack = document.createElement('img');
    newTrack.src = track.artworkUrl100;
    newTrack.alt = track.trackName;
    newTrack.title = track.trackName;
    let today = document.querySelector('.today');
    today.style.backgroundImage = "url('" + newTrack.src + "')";
    // Add the new track to the DOM
    //let entryChart = document.querySelector("body > main > section > div.calendar > table > tbody");
    //entryChart.appendChild(newTrack);
}

// This function takes in an object of search results that contains a "results" array. The first track in the results array is then rendered. If no results are found, no image is produced.
function renderSearchResults(searchResults) {
    renderTrack(searchResults.results[0]);
}

// Find the desired album artwork from the internet
const URL_TEMPLATE = "https://itunes.apple.com/search?entity=song&limit=25&term={searchTerm}";
function fetchTrack(searchTerm) {
    let url = URL_TEMPLATE.replace("{searchTerm}", searchTerm);
    return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      renderSearchResults(data);
      return data;
    })
    .catch(function(error) {
      console.log("No results found.");
      console.log(error);
    });
}

// This event listener handles the actions taken when clicking the submit button.
// 1) A new post is created in the JOURNAL_ENTRIES array
// 2) The post title, day description, and mood rating are immediately stored in the new post
// 3) The function calls fetchTrack() to find and store the corresponding album artwork
let btnElem = document.querySelector('#submit'); //change to submit specifically???
btnElem.addEventListener('click', function(event) {
  event.preventDefault();
  getTodayMood();
  //document.querySelector('.today').classList.add(moodInput);
  document.querySelector('.today').classList.add('filled');

  /*if(moodInput = ""){
    document.querySelector('#moodFeedback').textContent = "Please select a mood rating.";
  } else {*/

  let songSearch = document.querySelector('#songSearch').value;
  JOURNAL_ENTRIES.entries.push({postTitle: document.querySelector("#inputTitle").value,
                                date: document.querySelector("#inputDate").value,
                                dayDescription: document.querySelector("#inputBody").value,
                                //rebecca changed this part sorry!
                                //moodRating: document.querySelector("#formControlRange").value,
                                moodRating: moodInput,
                                song: fetchTrack(songSearch)})
  document.querySelector('.today').classList.add('filled');
  //Go back to calendar
  calendarPage.style.display = "block";
  landingPage.style.display = "none";
  aboutPage.style.display = "none";
  headerText.textContent = "Welcome to SongNotes";
});


//For switching album and color modes
let albumBtn = document.querySelector(".album-btn");
let colorBtn = document.querySelector(".color-btn");
let tdElem = document.querySelectorAll("td.filled");
albumBtn.addEventListener('click', function(){
  tdElem.forEach(function(td) {
    td.classList.remove('color');
    td.classList.add('album');
  });
});
colorBtn.addEventListener('click', function(){
  tdElem.forEach(function(td) {
    td.classList.remove('album');
    td.classList.add('color');
  });
});
