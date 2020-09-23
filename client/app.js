// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// RESOURCES: https://www.youtube.com/watch?v=J3KGuDRr0tE
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

const API_KEY = "apikey=4d772a2f024b736731088cbd1691d445";
const BASE_URL = "https://gateway.marvel.com:";

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// FAVORITE CHARACTER URL
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

const randomArrayIndex = Math.floor(Math.random() * favoriteCharacterIDs.length - 1);
const favoriteChar = `${BASE_URL}443/v1/public/characters/${favoriteCharacterIDs[randomArrayIndex]}?${API_KEY}`;

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// SERIES CHARACTER URLs
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

const charactersInfinity = `${BASE_URL}443/v1/public/events/29/characters?orderBy=name&limit=60&${API_KEY}`;
const charactersAgeUltron = `${BASE_URL}443/v1/public/events/314/characters?orderBy=name&${API_KEY}`;
const charactersCivilWar = `${BASE_URL}443/v1/public/events/238/characters?orderBy=name&limit=99&${API_KEY}`;

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// GET DOM ELEMENTS
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

const seriesNameElement = document.querySelector(".series-header");
const characterContainer = document.querySelector(".character-container");
const spinner = document.getElementById("spinner");
const favoriteCharImg = document.querySelector(".favorite-char-image");
const favoriteCharNameDiv = document.querySelector(".favorite-char-name");
const favoriteCharDescrDiv = document.querySelector(".favorite-char-description");
const comicBookApp = document.querySelector(".favorite-char-comic-appearances");
const comicBookContainer = document.querySelector(".favorite-char-comic-container");

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// SPINNER FUNCTIONALITY
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

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
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

const getCharacters = (seriesURL) => {
   spinnerVisible();
   return fetch(seriesURL)
      .then((response) => response.json())
      .then((data) => {
         spinnerHidden();
         return data;
      });
};

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// ADD COMICS OF FAV CHARACTER TO HIDDEN DIV
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

const addComicsToHiddenDiv = (characterData) => {
   comicBookContainer.textContent = "";
   // console.log(characterData);

   if (characterData.data.results.length === 0) {
      console.log("oeps");
      // ENTER: HULK SMASH!!!
   } else {
      characterData.data.results.forEach((comic) => {
         const newDiv = document.createElement("div");
         const newImg = document.createElement("img");
         const newComicTitle = document.createElement("h6");

         newDiv.classList = "favorite-char-comic-item";
         comicBookContainer.appendChild(newDiv);
         newDiv.appendChild(newImg);

         console.log(characterData.data.results.length);
         newImg.src = `${comic.thumbnail.path}/${imgRatioPortrait324h}.jpg`;
         newComicTitle.textContent = `${comic.title}`;
         newDiv.appendChild(newComicTitle);
      });
   }
   comicBookApp.style.display = "block";
};

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// ADD RANDOM FAVOURITE CHARACTER TO DOM
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

const addFavoriteCharToPage = (characterData) => {
   const characterDataVar = characterData.data.results;
   const comicBooksChar = `${BASE_URL}443/v1/public/characters/${characterDataVar[0].id}/comics?limit=3&${API_KEY}`;
   // console.log(comicBooksChar);

   characterDataVar.sort(function (a, b) {
      return b.comics.available - a.comics.available;
   });

   const newImg = document.createElement("img");
   const favoriteCharName = document.createElement("h2");
   const newDescrParagraph = document.createElement("p");
   const newFreqParagraph = document.createElement("p");
   const comicBookFrequency = `${characterDataVar[0].comics.available}`;
   const newComicCharButton = document.createElement("button");

   newImg.src = `${characterDataVar[0].thumbnail.path}/${imgRatioSquare250w}.${characterDataVar[0].thumbnail.extension}`;
   favoriteCharImg.appendChild(newImg);
   favoriteCharName.textContent = characterDataVar[0].name.replace(/\(.*\)/, "");
   favoriteCharNameDiv.appendChild(favoriteCharName);
   newDescrParagraph.textContent = characterDataVar[0].description;
   favoriteCharDescrDiv.appendChild(newDescrParagraph);
   newFreqParagraph.textContent = `(Appeared in ${comicBookFrequency} comics)`;
   newFreqParagraph.classList = "favorite-char-freq";

   // Only displays the appearance frequency when larger than 10
   comicBookFrequency >= 3 && favoriteCharNameDiv.appendChild(newFreqParagraph);

   newComicCharButton.textContent = "Show Recent Comics";
   favoriteCharDescrDiv.appendChild(newComicCharButton);

   newComicCharButton.addEventListener("click", function () {
      getCharacters(comicBooksChar).then(addComicsToHiddenDiv);
   });
};

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// ADD SERIES CHARACTERS TO DOM
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

const addCharactersToPage = (characterData) => {
   characterContainer.textContent = "";
   // characterContainer.style.minHeight = "100vh"; // Prevents auto scroll
   characterData.data.results.sort(function (a, b) {
      return b.comics.available - a.comics.available;
   });

   characterData.data.results.forEach((character) => {
      const characterImage = `${character.thumbnail.path}/${imgRatioSquare250w}.${character.thumbnail.extension}`;
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
   });
   // characterContainer.style.minHeight = "0"; // Prevents auto scroll
};

getCharacters(favoriteChar).then(addFavoriteCharToPage);
