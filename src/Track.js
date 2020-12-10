import { isCompositeComponent } from "react-dom/test-utils";

// This function takes a track and creates an album cover to add to the DOM.
function renderTrack(track) {
  // newTrack.src = track.artworkUrl100;
  // newTrack.alt = track.trackName;
  // newTrack.title = track.trackName;
  // console.log("Track", track.artistName);

  return [track.artworkUrl100, track.artistName, track.trackName];

  // let today = document.querySelector('.today');
  // today.style.backgroundImage = "url('" + newTrack.src + "')";
  // Add the new track to the DOM
  //let entryChart = document.querySelector("body > main > section > div.calendar > table > tbody");
  //entryChart.appendChild(newTrack);
}

// This function takes in an object of search results that contains a "results" array. The first track in the results array is then rendered. If no results are found, no image is produced.
// function renderSearchResults(searchResults) {
//   renderTrack(searchResults.results[0]);
// }

function renderSearchResults(searchResults) {
  return renderTrack(searchResults.results[0]);
}

// Find the desired album artwork from the internet
const URL_TEMPLATE = "https://itunes.apple.com/search?entity=song&limit=25&term={searchTerm}";
function fetchTrack(searchTerm, processData) {
  let url = URL_TEMPLATE.replace("{searchTerm}", searchTerm);
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      processData(data);
    })
    .catch(function (error) {
      console.log("No results found.");
      console.log(error);
    });
}

export default fetchTrack;
export { renderTrack, renderSearchResults, fetchTrack};