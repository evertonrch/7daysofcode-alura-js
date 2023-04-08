import json from "./fetchData.js";

const container = document.querySelector(".container");
//   {
//     name: "Batman (2022)",
//     rating: 9.4,
//     image: "./assets/img/batman.svg",
//     description: `
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
//             ad, deserunt accusantium iste quasi blanditiis accusamus voluptates
//             consectetur ex magni doloribus aut quia nulla, repudiandae explicabo
//             iure adipisci! Optio, fuga! Repellendus voluptas quidem illum
//             aliquam corporis unde pariatur.
//         `,
//   },
//   {
//     name: "Avatar (2006)",
//     rating: 9.0,
//     image: "./assets/img/avatar.svg",
//     description: `
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
//             ad, deserunt accusantium iste quasi blanditiis accusamus voluptates
//             consectetur ex magni doloribus aut quia nulla, repudiandae explicabo
//             iure adipisci! Optio, fuga! Repellendus voluptas quidem illum
//             aliquam corporis unde pariatur.
//         `,
//   },
// ];

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

popularMovies
  .then((movieArr) => {
    return movieArr.map((movie) => {
      const imagePath = `https://image.tmdb.org/t/p/w500/${movie.image}`;
      const html = `
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
      return html;
    });
  })
  .then((html) => {
    const cards = html.join("");
    container.innerHTML = cards;
  })
  .catch((err) => console.error(err.message));
