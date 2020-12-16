// Find the desired album artwork from the internet
const URL_TEMPLATE = "https://itunes.apple.com/search?entity=song&limit=25&term={searchTerm}";
function fetchTrack(searchTerm, processData) {
  let url = URL_TEMPLATE.replace("{searchTerm}", searchTerm);
  togglerSpinner();
  return fetch(url)
    .then(function (response) {
      // insert spinning symbol
      return response.json();
    })
    .then(function (data) {
      processData(data);
      // remove spinning symbol
      // insert complete message
    })
    .catch(function (error) {
      console.log("No results found.");
      renderError(error);
      console.log(error);
    })
    .then(togglerSpinner);
}

function togglerSpinner() {
    let spinnerBox = document.querySelector('.song-loading-spinner');

    if(spinnerBox.classList.contains("disabled")){
      let spinner = document.createElement('Spinner');
      spinnerBox.appendChild(spinner);
      spinnerBox.classList.remove('disabled');

    } else {
      spinnerBox.removeChild(document.querySelector('Spinner'));
      spinnerBox.classList.add('disabled');
    }
}

function renderError(error) {
    var message = document.createElement('p');
    message.classList.add('alert', 'alert-danger');
    // console.log(err.message);
    message.innerText = error.message;
    document.querySelector(".errors").appendChild(message);
}



export default fetchTrack;
export { fetchTrack };
