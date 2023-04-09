import json from "./fetchData.js";
import apiKey from "./apiKey.js";

const container = document.querySelector(".container");
const btnSearch = document.querySelector(".btn-search");
const inputSearch = document.querySelector(".in-search");

// Cria array com propriedades do card
const popularMovies = json.then((data) => {
  return data.map((obj) => {
    const { id, title, overview, backdrop_path, vote_average } = obj;
    return {
      id,
      title,
      description: overview,
      image: backdrop_path,
      rating: vote_average,
    };
  });
});

// Cria html do card
const createCard = function (movie, imagePath) {
  return `
  <div class="wrapper-card">
    <div class="wrapper-movie-details">
            <img src=${imagePath} alt="${movie.title}" />
            <div class="wrapper-details">
                <h4>${movie.title}</h4>
                <div class="wrapper-favorite">
                <small>
                    <i class="fa-solid fa-star"></i>
                    <span>${movie.rating}</span>
                </small>
                <small>
                    <i class="fa-solid fa-heart"></i>
                    <span>Favoritar</span>
                </small>
                </div>
            </div>
    </div>
    <span class="movie-description">${movie.description}</span>
</div>`;
};

// Popula html
popularMovies
  .then((movieArr) => {
    return movieArr.map((movie) => {
      const imagePath = `https://image.tmdb.org/t/p/w500/${movie.image}`;
      return createCard(movie, imagePath);
    });
  })
  .then((html) => {
    const cards = html.join("");
    container.innerHTML = cards;
  })
  .catch((err) => console.error(err.message));

// Buscando filme por um filtro
btnSearch.addEventListener("click", function (e) {
  const inValue = inputSearch.value.toLowerCase();
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${
      apiKey.value
    }&language=en-US&page=1&query=${inValue.toLowerCase()}`
  )
    .then((response) => {
      if (!response.status)
        throw new Error(`Something went wrong (${response.status})`);
      return response.json();
    })
    .then((data) => data.results)
    .then((results) => {
      const newArr = results.map((movie) => {
        const { title, overview, poster_path, vote_count } = movie;
        return {
          title,
          description: overview,
          image: poster_path,
          rating: vote_count,
        };
      });
      return newArr;
    })
    .then((arrMovie) => {
      return arrMovie.map((movie) => {
        const imgPath = `https://image.tmdb.org/t/p/w500/${movie.image}`;
        return createCard(movie, imgPath);
      });
    })
    .then((cards) => {
      const html = cards.join("");
      container.innerHTML = html;
    })
    .catch((err) => {
      console.error(err.message);
    });
});

// Se o input estiver vazio retorna a lista completa
inputSearch.addEventListener("change", function (e) {
  const value = e.target.value;
  if (value.length === 0) {
    const getPopularMovies = async function () {
      const movies = await popularMovies;
      const cards = movies.map((movie) => {
        const imgPath = `https://image.tmdb.org/t/p/w500/${movie.image}`;
        return createCard(movie, imgPath);
      });
      container.innerHTML = cards.join("");
    };
    getPopularMovies();
  }
});
