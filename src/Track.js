// Find the desired album artwork from the internet
// const URL_TEMPLATE = "https://itunes.apple.com/search?entity=song&limit=25&term={searchTerm}";
const URL_TEMPLATE = "https://itunes.apple.com/search?limit=25&term={searchTerm}";
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
    })
}

export default fetchTrack;
export { fetchTrack };
