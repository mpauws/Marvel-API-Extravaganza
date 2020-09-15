// https://www.youtube.com/watch?v=J3KGuDRr0tE

const API_KEY = "4d772a2f024b736731088cbd1691d445";
const charactersInfinityURL = `https://gateway.marvel.com:443/v1/public/events/29/characters?limit=60&apikey=${API_KEY}`;

// IMAGE VARIANTS: https://developer.marvel.com/documentation/images
const imgRatioPortrait = "portrait_incredible"; // 216 x 324px
const imgRatioSquare = "standard_fantastic"; // 250 x 250px
const imgRatioLandscape = "landscape_amazing"; // 250 x 156px

const snapElement = document.getElementById("snap-button");
const characterContainer = document.querySelector(".character-container");

// const audioElement = new Audio("sounds/intro.mp3");
// audioElement.play();

const getCharacterData = () => {
   if (localStorage.getCharacterData) {
      return Promise.resolve(JSON.parse(localStorage.characterData));
   }

   return fetch(charactersInfinityURL)
      .then((response) => response.json())
      .then((data) => {
         localStorage.charactersInfinityURL = JSON.stringify(data);
         return data;
      });
};

// To hide groups & Thanos (Avengers, Fantastic Four, X-Men)
const hiddenCharacters = {
   1009652: true,
   1009165: true,
   1009726: true,
   1009299: true,
};

const addCharactersToPage = (characterData) => {
   console.log(characterData);
   // Header
   const seriesNameElement = document.querySelector(".series-header");
   seriesNameElement.textContent = "Infinity Gauntlet";

   characterData.data.results.forEach((character) => {
      const characterImage = `${character.thumbnail.path}/${imgRatioSquare}.${character.thumbnail.extension}`;
      const characterName = character.name.replace(/\(.*\)/, "");
      const newDiv = document.createElement("div");
      const characterNameElement = document.createElement("h4");
      const newImg = document.createElement("img");
      const newParagraph = document.createElement("p");

      if (!hiddenCharacters[character.id]) {
         characterContainer.appendChild(newDiv);
         newDiv.appendChild(newImg);
         newDiv.classList.add("character-item");
         newImg.src = characterImage;
         characterNameElement.textContent = characterName;
         newDiv.appendChild(characterNameElement);
         newParagraph.textContent = "Appeared in x comics";
         newDiv.appendChild(newParagraph);
      }
   });
};

getCharacterData().then(addCharactersToPage);

// snapElement.addEventListener("click", () => {});
