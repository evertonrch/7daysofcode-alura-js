"use strict";

const container = document.querySelector(".container");

const movies = [
  {
    name: "Batman (2022)",
    rating: 9.4,
    image: "./assets/img/batman.svg",
    description: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            ad, deserunt accusantium iste quasi blanditiis accusamus voluptates
            consectetur ex magni doloribus aut quia nulla, repudiandae explicabo
            iure adipisci! Optio, fuga! Repellendus voluptas quidem illum
            aliquam corporis unde pariatur.
        `,
  },
  {
    name: "Avatar (2006)",
    rating: 9.0,
    image: "./assets/img/avatar.svg",
    description: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            ad, deserunt accusantium iste quasi blanditiis accusamus voluptates
            consectetur ex magni doloribus aut quia nulla, repudiandae explicabo
            iure adipisci! Optio, fuga! Repellendus voluptas quidem illum
            aliquam corporis unde pariatur.
        `,
  },
];

const alt = function (imagePath) {
  const splited = imagePath.split("/");
  return splited[splited.length - 1].split(".")[0];
};

const createCard = function (movies) {
  return movies.map((movie) => {
    const html = `
        <div class="wrapper-card">
            <div class="wrapper-movie-details">
                    <img src=${movie.image} alt="${alt(movie.image)}" />
                    <div class="wrapper-details">
                        <h4>${movie.name}</h4>
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
};

const displayCards = function () {
  const cardArr = createCard(movies).join();
  container.innerHTML = cardArr;
};

displayCards();
