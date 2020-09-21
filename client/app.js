// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// RESOURCES: https://www.youtube.com/watch?v=J3KGuDRr0tE
const API_KEY = "&apikey=4d772a2f024b736731088cbd1691d445";
const BASE_URL = "https://gateway.marvel.com:";

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// FEATURED CHARACTER URL
let randomOffset = Math.floor(Math.random() * 1488);
// console.log(randomOffset);
const featuredChar = `${BASE_URL}443/v1/public/characters?limit=5&offset=${randomOffset}${API_KEY}`;

const favoriteCharacterIDs = [
  1009146,
  1009165,
  1017109,
  1009220,
  1009220,
  1010676,
  1009262,
  1009297,
  1017110,
  1009299,
  1011299,
  1009619,
  1017108,
  1009351,
  1017098,
  1017107,
  1016839,
  1009368,
  1017104,
  1009538,
  1017577,
  1017099,
  1010744,
  1009571,
  1009577,
  1017111,
  1009583,
  1009588,
  1009592,
  1011223,
  1009609,
  1011347,
  1009610,
  1012200,
  1011114,
  1016181,
  1011010,
  1009608,
  1010794,
  1010733,
  1009629,
  1010979,
  1009652,
  1017103,
  1009662,
  1010983,
  1009664,
  1017576,
  1017106,
  1011025,
  1010820,
  1010369,
  1016825,
  1009685,
  1010350,
  1009663,
  1010788,
  1011128,
  1009697,
  1009699,
  1010990,
  1010991,
  1009707,
  1010992,
  1009718,
  1011006,
  1009719,
  1009720,
  1009725,
  1009726,
];
const randomArrayIndex = Math.floor(
  Math.random() * favoriteCharacterIDs.length - 1
);

console.log(favoriteCharacterIDs[randomArrayIndex]);

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// SERIES CHARACTER URLs
const charactersInfinity = `${BASE_URL}443/v1/public/events/29/characters?orderBy=name&limit=60${API_KEY}`;
const charactersAgeUltron = `${BASE_URL}443/v1/public/events/314/characters?orderBy=name${API_KEY}`;
const charactersCivilWar = `${BASE_URL}443/v1/public/events/238/characters?orderBy=name&limit=99${API_KEY}`;

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// IMAGE VARIANTS: https://developer.marvel.com/documentation/images

// const imgRatioPortrait = "portrait_small" // 50x75px
// const imgRatioPortrait = "portrait_medium" // 100x150px
// const imgRatioPortrait = "portrait_xlarge" // 150x225px
// const imgRatioPortrait = "portrait_fantastic" // 168x252px
const imgRatioPortrait = "portrait_incredible"; // 216x324px
// const imgRatioPortrait = "portrait_uncanny" // 300x450px

// const imgRatioSquare = "standard_small" //  65x45px
// const imgRatioSquare = "standard_medium"; //  100x100px
// const imgRatioSquare = "standard_large"; //  140x140px
// const imgRatioSquare = "standard_xlarge"; //  200x200px
const imgRatioSquare = "standard_fantastic"; //  250x250px
// const imgRatioSquare = "standard_amazing" //  180x180px

// const imgRatioLandscape = "landscape_small"; //   120x90px
// const imgRatioLandscape = "landscape_medium"; //   175x130px
// const imgRatioLandscape = "landscape_large"; //   190x140px
// const imgRatioLandscape = "landscape_xlarge"; //   270x200px
const imgRatioLandscape = "landscape_amazing"; //   250x156px
// const imgRatioLandscape = "landscape_incredible"; //   464x261px

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// GET DOM ELEMENTS
const seriesNameElement = document.querySelector(".series-header");
const characterContainer = document.querySelector(".character-container");
const spinner = document.getElementById("spinner");
const featuredCharImg = document.querySelector(".featured-char-image");
const featuredCharNameDiv = document.querySelector(".featured-char-name");
const featuredCharDescrDiv = document.querySelector(
  ".featured-char-description"
);

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// SPINNER FUNCTIONALITY
const spinnerVisible = () => {
  spinner.style.display = "block";
  setTimeout(() => {
    spinner.style.display = "none";
  }, 5000);
};

const spinnerHidden = () => {
  spinner.style.display = "none";
};

// TO DO: localStorage!!!

const handleClick = (series) => {
  seriesNameElement.textContent = `Characters of ${series}`;
  if (series === "Infinity Gauntlet") {
    getCharacters(charactersInfinity).then(addCharactersToPage);
  } else if (series === "Age of Ultron") {
    getCharacters(charactersAgeUltron).then(addCharactersToPage);
  } else if (series === "Civil War") {
    getCharacters(charactersCivilWar).then(addCharactersToPage);
  }
};

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// FETCH CHARACTERS
const getCharacters = (seriesURL) => {
  characterContainer.textContent = "";
  spinnerVisible();
  return fetch(seriesURL)
    .then((response) => response.json())
    .then((data) => {
      spinnerHidden();
      return data;
    });
};

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// ADD CHARACTERS TO DOM
const addCharactersToPage = (characterData) => {
  // console.log(characterData);
  console.log(characterData.data.results);

  characterData.data.results.sort(function (a, b) {
    return b.comics.available - a.comics.available;
  });

  characterData.data.results.forEach((character) => {
    const characterImage = `${character.thumbnail.path}/${imgRatioSquare}.${character.thumbnail.extension}`;
    const comicBookFrequency = `${character.comics.available}`;
    const characterName = character.name.replace(/\(.*\)/, "");
    const newDiv = document.createElement("div");
    const characterNameElement = document.createElement("h4");
    const imgContainer = document.createElement("div");
    const newImg = document.createElement("img");
    const newParagraph = document.createElement("p");

    characterContainer.appendChild(newDiv);
    newDiv.appendChild(imgContainer);
    imgContainer.appendChild(newImg);
    imgContainer.classList.add("image-container");
    newDiv.classList.add("character-item");
    newImg.src = characterImage;
    characterNameElement.textContent = characterName;
    newDiv.appendChild(characterNameElement);
    newParagraph.textContent = `Appeared in ${comicBookFrequency} comics`;
    newDiv.appendChild(newParagraph);

    // TO DO: display description of character
    newDiv.addEventListener("click", () => {
      console.log(character.description);
    });
  });
};

const addFeaturedCharToPage = (characterData) => {
  const characterDataVar = characterData.data.results;

  characterDataVar.sort(function (a, b) {
    return b.comics.available - a.comics.available;
  });

  console.log(characterDataVar[0]);

  const newImg = document.createElement("img");
  const featuredCharName = document.createElement("h2");
  const newParagraph = document.createElement("p");

  newImg.src = `${characterDataVar[0].thumbnail.path}/${imgRatioSquare}.${characterDataVar[0].thumbnail.extension}`;
  featuredCharImg.appendChild(newImg);
  featuredCharName.textContent = characterDataVar[0].name;
  featuredCharNameDiv.appendChild(featuredCharName);
  newParagraph.textContent = characterDataVar[0].description;
  featuredCharDescrDiv.appendChild(newParagraph);
};

getCharacters(featuredChar).then(addFeaturedCharToPage);
