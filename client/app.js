// https://www.youtube.com/watch?v=J3KGuDRr0tE

const API_KEY = "4d772a2f024b736731088cbd1691d445";
const charactersURL = `https://gateway.marvel.com:443/v1/public/events/29/characters?limit=60&apikey=${API_KEY}`;

// IMAGE VARIANTS: https://developer.marvel.com/documentation/images
const imgRatioPortrait = "portrait_incredible"; // 216 x 324px
const imgRatioSquare = "standard_fantastic"; // 250 x 250px
const imgRatioLandscape = "landscape_amazing"; // 250 x 156px

const audioElement = new Audio("sounds/intro.mp3");
/* audioElement.play(); */

const snapElement = document.getElementById("snap-button");

function getCharacterData() {
   // Local Storage (55 min)
   if (localStorage.getCharacterData) {
      return Promise.resolve(JSON.parse(localStorage.characterData));
   }

   return fetch(charactersURL)
      .then((response) => response.json())
      .then((data) => {
         localStorage.charactersURL = JSON.stringify(data);
         return data;
      });
}

// To hide groups & Thanos (Avengers, Fantastic Four, X-Men)
const hiddenCharacters = {
   1009652: true,
   1009165: true,
   1009726: true,
   1009299: true,
};

function addCharactersToPage(characterData) {
   // console.log(characterData.data.results);

   characterData.data.results.forEach((character) => {
      const characterImage = `${character.thumbnail.path}/${imgRatioSquare}.${character.thumbnail.extension}`;
      const characterContainer = document.querySelector(".character");
      const newDiv = document.createElement("div");
      const newImg = document.createElement("img");
      const characterNameElement = document.createElement("h4");
      const characterName = character.name.replace(/\(.*\)/, "");

      if (!hiddenCharacters[character.id]) {
         newImg.src = characterImage;
         characterContainer.appendChild(newDiv);
         newDiv.appendChild(newImg);
         characterNameElement.textContent = characterName;
         newDiv.appendChild(characterNameElement);
      }
   });
}

getCharacterData().then(addCharactersToPage);

snapElement.addEventListener("click", () => {});
