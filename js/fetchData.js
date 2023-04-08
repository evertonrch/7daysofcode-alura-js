import apiKey from "./apiKey.js";

const url = "https://api.themoviedb.org/3/movie/popular?api_key=";

const json = fetch(url.concat(apiKey.value))
  .then((response) => {
    if (!response.ok) throw new Error(`Response error (${response.status})`);

    return response.json();
  })
  .then((json) => json.results)
  .catch((err) => {
    console.error(err);
  });

export default json;
