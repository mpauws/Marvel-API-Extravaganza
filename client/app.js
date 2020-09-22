// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// RESOURCES: https://www.youtube.com/watch?v=J3KGuDRr0tE
const API_KEY = "apikey=4d772a2f024b736731088cbd1691d445";
const BASE_URL = "https://gateway.marvel.com:";

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// FAVORITE CHARACTER URL
// const favoriteChar = `${BASE_URL}443/v1/public/characters?limit=5&offset=${randomOffset}&${API_KEY}`;
const randomArrayIndex = Math.floor(Math.random() * favoriteCharacterIDs.length - 1);
const favoriteChar = `${BASE_URL}443/v1/public/characters/${favoriteCharacterIDs[randomArrayIndex]}?${API_KEY}`;

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// SERIES CHARACTER URLs
const charactersInfinity = `${BASE_URL}443/v1/public/events/29/characters?orderBy=name&limit=60&${API_KEY}`;
const charactersAgeUltron = `${BASE_URL}443/v1/public/events/314/characters?orderBy=name&${API_KEY}`;
const charactersCivilWar = `${BASE_URL}443/v1/public/events/238/characters?orderBy=name&limit=99&${API_KEY}`;

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// GET DOM ELEMENTS
const seriesNameElement = document.querySelector(".series-header");
const characterContainer = document.querySelector(".character-container");
const spinner = document.getElementById("spinner");
const favoriteCharImg = document.querySelector(".favorite-char-image");
const favoriteCharNameDiv = document.querySelector(".favorite-char-name");
const favoriteCharDescrDiv = document.querySelector(".favorite-char-description");

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

const handleClickComicApp = () => {
   const comicBookApp = document.querySelector(".favorite-char-comic-appearances");
   console.log("Ik werk");
   comicBookApp.style.display = "block";
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
// ADD RANDOM FAVOURITE CHARACTER TO DOM
const addFavoriteCharToPage = (characterData) => {
   const characterDataVar = characterData.data.results;
   console.log();
   const comicBooksChar = `${BASE_URL}443/v1/public/characters/${characterDataVar[0]}/comics?limit=5&${API_KEY}`;
   console.log(comicBooksChar);

   characterDataVar.sort(function (a, b) {
      return b.comics.available - a.comics.available;
   });

   const newImg = document.createElement("img");
   const favoriteCharName = document.createElement("h2");
   const newParagraph = document.createElement("p");
   const newFreqParagraph = document.createElement("p");
   const comicBookFrequency = `${characterDataVar[0].comics.available}`;
   const newDiv = document.createElement("div");

   newImg.src = `${characterDataVar[0].thumbnail.path}/${imgRatioSquare250}.${characterDataVar[0].thumbnail.extension}`;
   favoriteCharImg.appendChild(newImg);
   favoriteCharName.textContent = characterDataVar[0].name.replace(/\(.*\)/, "");
   favoriteCharNameDiv.appendChild(favoriteCharName);
   newParagraph.textContent = characterDataVar[0].description;
   favoriteCharDescrDiv.appendChild(newParagraph);
   newFreqParagraph.textContent = `(Appeared in ${comicBookFrequency} comics)`;
   newFreqParagraph.classList = "favorite-char-freq";
   // Only displays the appearance frequency when larger than 10
   comicBookFrequency > 10 && favoriteCharNameDiv.appendChild(newFreqParagraph);

   // CONSOLE.LOG FIRST COMIC BOOK (LATER FIRST 5) OF CHARACTER
   // console.log(`${characterDataVar[0].comics.items[0].resourceURI}?${API_KEY}`);
   console.log(characterDataVar[0]);

   // FOR LOOP:
   //    * CREATE COMIC BOOK ITEM DIV
   //    * CREATE NEW IMAGE
   //    * SET SRC PROPERTY OF NEW IMAGE
   //    * APPEND IMAGE TO COMIC BOOK ITEM DIV
   //    * SLIDE OPEN WHEN BUTTON IS CLICKED (CSS)?
};

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// ADD SERIES CHARACTERS TO DOM
const addCharactersToPage = (characterData) => {
   characterContainer.style.minHeight = "100vh"; // Prevents auto scroll
   characterData.data.results.sort(function (a, b) {
      return b.comics.available - a.comics.available;
   });

   characterData.data.results.forEach((character) => {
      const characterImage = `${character.thumbnail.path}/${imgRatioSquare250}.${character.thumbnail.extension}`;
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
};

getCharacters(favoriteChar).then(addFavoriteCharToPage);
