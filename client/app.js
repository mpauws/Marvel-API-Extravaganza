// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// RESOURCES: https://www.youtube.com/watch?v=J3KGuDRr0tE
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

const API_KEY = "apikey=4d772a2f024b736731088cbd1691d445";
const BASE_URL = "https://gateway.marvel.com:443/v1/public/";

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// FAVORITE CHARACTER URL
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

console.log(favCharIDs);

let randomArrayIndex = Math.floor(Math.random() * favCharIDs.length - 1);
const favoriteChar = `${BASE_URL}characters/${favCharIDs[randomArrayIndex]}?${API_KEY}`;
const refreshfavoriteChar = `${BASE_URL}characters/${favCharIDs[randomArrayIndex + 1]}?${API_KEY}`;

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// SERIES CHARACTER URLs
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

const charactersInfinity = `${BASE_URL}events/29/characters?orderBy=name&limit=60&${API_KEY}`;
const charactersAgeUltron = `${BASE_URL}events/314/characters?orderBy=name&${API_KEY}`;
const charactersCivilWar = `${BASE_URL}events/238/characters?orderBy=name&limit=99&${API_KEY}`;

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// GET DOM ELEMENTS
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

const spinner = document.getElementById("spinner");
const favoriteCharImg = document.querySelector(".section-2-image");
const favoriteCharNameDiv = document.querySelector(".section-2-char-name");
const favoriteCharDescrDiv = document.querySelector(".section-2-char-description");
const comicBookApp = document.querySelector(".section-2-comic-container");
const comicBookContainer = document.querySelector(".section-2-comic-wrapper");
const seriesNameElement = document.querySelector(".section-3-char-header");
const characterContainer = document.querySelector(".section-3-char-wrapper");

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
// TO DO: Use event.target to fire off getCharacters

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
// ADD RANDOM FAVOURITE CHARACTER TO DOM
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

const addFavoriteCharToPage = (characterData) => {
   const characterDataVar = characterData.data.results;
   const comicBooksChar = `${BASE_URL}characters/${characterDataVar[0].id}/comics?limit=3&${API_KEY}`;

   characterDataVar.sort(function (a, b) {
      return b.comics.available - a.comics.available;
   });

   const newImg = document.createElement("img");
   const favoriteCharName = document.createElement("h2");
   const newDescrParagraph = document.createElement("p");
   const newFreqParagraph = document.createElement("p");
   const comicBookFrequency = `${characterDataVar[0].comics.available}`;
   const displayCharComicsButton = document.createElement("button");
   const refreshCharButton = document.createElement("button");

   newImg.src = `${characterDataVar[0].thumbnail.path}/${imgRatioSquare250w}.${characterDataVar[0].thumbnail.extension}`;
   favoriteCharImg.appendChild(newImg);
   favoriteCharName.textContent = characterDataVar[0].name.replace(/\(.*\)/, "");
   favoriteCharNameDiv.appendChild(favoriteCharName);
   newDescrParagraph.textContent = characterDataVar[0].description;
   favoriteCharDescrDiv.appendChild(newDescrParagraph);
   newFreqParagraph.textContent = `(Appeared in ${comicBookFrequency} comics)`;
   newFreqParagraph.classList = "section-2-char-freq";

   comicBookFrequency >= 3 && favoriteCharNameDiv.appendChild(newFreqParagraph);

   displayCharComicsButton.textContent = "Show Recent Comics";
   favoriteCharDescrDiv.appendChild(displayCharComicsButton);

   refreshCharButton.textContent = "Refresh Character";
   favoriteCharDescrDiv.appendChild(refreshCharButton);

   displayCharComicsButton.addEventListener("click", () => {
      getCharacters(comicBooksChar).then(addComicsToHiddenDiv);
   });

   /*    refreshCharButton.addEventListener("click", () => {
      favoriteCharImg.textContent = "";
      favoriteCharNameDiv.textContent = "";
      favoriteCharDescrDiv.textContent = "";
      favoriteCharDescrDiv.textContent = "";
      getCharacters(refreshfavoriteChar).then(addFavoriteCharToPage);
      
   }); */
};

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// ADD COMICS OF FAV CHARACTER TO HIDDEN DIV
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

const addComicsToHiddenDiv = (characterData) => {
   comicBookContainer.textContent = "";

   if (characterData.data.results.length === 0) {
      console.log("oeps");
      const newDiv = document.createElement("div");
      const newImg = document.createElement("img");
      const newComicTitle = document.createElement("h6");
      comicBookContainer.appendChild(newDiv);
      newDiv.appendChild(newImg);
      newImg.src = "./images/hulk-smash.jpg";
      newImg.classList = "favorite-char-comic-error";
      newComicTitle.textContent =
         "Oh dear... unfortunately the Marvil Comics API doesn't seem to contain any comic books with this character";
      newDiv.appendChild(newComicTitle);
      // Add refresh button to load new character
   } else {
      characterData.data.results.forEach((comic) => {
         const newDiv = document.createElement("div");
         const newImg = document.createElement("img");
         const newComicTitle = document.createElement("h6");

         newDiv.classList = "section-2-comic-item";
         comicBookContainer.appendChild(newDiv);
         newDiv.appendChild(newImg);

         newImg.src = `${comic.thumbnail.path}/${imgRatioPortrait324h}.jpg`;
         newComicTitle.textContent = `${comic.title}`;
         newDiv.appendChild(newComicTitle);
      });
   }
   comicBookApp.style.display = "block";
};

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// ADD SERIES CHARACTERS TO DOM
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

const addCharactersToPage = (characterData) => {
   characterContainer.textContent = "";
   characterData.data.results.sort(function (a, b) {
      return b.comics.available - a.comics.available;
   });

   characterData.data.results.forEach((character) => {
      const characterImage = `${character.thumbnail.path}/${imgRatioSquare250w}.${character.thumbnail.extension}`;
      const comicBookFrequency = `${character.comics.available}`;
      const characterName = character.name.replace(/\(.*\)/, "");
      const newDiv = document.createElement("div");
      const characterNameElement = document.createElement("h4");
      const newImg = document.createElement("img");
      const newParagraph = document.createElement("p");

      characterContainer.appendChild(newDiv);
      newDiv.appendChild(newImg);
      newDiv.classList.add("section-3-char-item");
      newImg.src = characterImage;
      characterNameElement.textContent = characterName;
      newDiv.appendChild(characterNameElement);
      newParagraph.textContent = `Appeared in ${comicBookFrequency} comics`;
      newDiv.appendChild(newParagraph);
   });
};

getCharacters(favoriteChar).then(addFavoriteCharToPage);
