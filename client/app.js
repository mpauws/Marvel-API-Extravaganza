// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// RESOURCES: https://www.youtube.com/watch?v=J3KGuDRr0tE
const API_KEY = "4d772a2f024b736731088cbd1691d445";
const BASE_URL = "https://gateway.marvel.com:";

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// SERIES CHARACTER URLs
const charactersInfinity = `${BASE_URL}443/v1/public/events/29/characters?orderBy=name&limit=60&apikey=${API_KEY}`;
const charactersAgeUltron = `${BASE_URL}443/v1/public/events/314/characters?orderBy=name&apikey=${API_KEY}`;
const charactersCivilWar = `${BASE_URL}443/v1/public/events/238/characters?orderBy=name&limit=99&apikey=${API_KEY}`;

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
const imgRatioSquare = "standard_xlarge"; //  200x200px
// const imgRatioSquare = "standard_fantastic"; //  250x250px
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
   console.log(characterData.data.results);
   seriesNameElement.textContent = "Characters";
   characterData.data.results.forEach((character) => {
      const characterImage = `${character.thumbnail.path}/${imgRatioSquare}.${character.thumbnail.extension}`;
      const comicBookFrequency = `${character.comics.available}`;
      const characterName = character.name.replace(/\(.*\)/, "");
      const newDiv = document.createElement("div");
      const characterNameElement = document.createElement("h4");
      const newImg = document.createElement("img");
      const newParagraph = document.createElement("p");

      characterContainer.appendChild(newDiv);
      newDiv.appendChild(newImg);
      newDiv.classList.add("character-item");
      newImg.src = characterImage;
      characterNameElement.textContent = characterName;
      newDiv.appendChild(characterNameElement);
      newParagraph.textContent = `Appeared in ${comicBookFrequency} comics`;
      newDiv.appendChild(newParagraph);
   });
};
