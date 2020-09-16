// RESOURCES:
// https://www.youtube.com/watch?v=J3KGuDRr0tE
// IMAGE VARIANTS: https://developer.marvel.com/documentation/images

const API_KEY = "4d772a2f024b736731088cbd1691d445";
const charactersInfinityURL = `https://gateway.marvel.com:443/v1/public/events/29/characters?limit=60&apikey=${API_KEY}`;

const imgRatioPortrait = "portrait_incredible"; // 216 x 324px
const imgRatioSquare = "standard_fantastic"; // 250 x 250px
const imgRatioLandscape = "landscape_amazing"; // 250 x 156px

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// GET DOM ELEMENTS

const seriesNameElement = document.querySelector(".series-header");
const characterContainer = document.querySelector(".character-container");
const spinner = document.getElementById("spinner");

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// SPINNER FUNCTIONALITY

const spinnerVisible = () => {
   spinner.style.visibility = "visible";
   setTimeout(() => {
      spinner.style.visibility = "hidden";
   }, 5000);
};

const spinnerHidden = () => {
   return (spinner.style.visibility = "hidden");
};

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// FETCH INFINITY GAUNTLET CHARACTERS

const getCharacterData = () => {
   /* if (seriesNameElement.textContent === "") {
      spinnerVisible();
   } */
   if (localStorage.getCharacterData) {
      return Promise.resolve(JSON.parse(localStorage.characterData));
   }

   return fetch(charactersInfinityURL)
      .then((response) => response.json())
      .then((data) => {
         localStorage.charactersInfinityURL = JSON.stringify(data);
         /* spinnerHidden(); */
         return data;
      });
};

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// ADD INFINITY GAUNTLET CHARACTERS TO DOM

const addCharactersToPage = (characterData) => {
   //console.log(characterData);
   seriesNameElement.textContent = "Infinity Gauntlet";
   characterData.data.results.forEach((character) => {
      const characterImage = `${character.thumbnail.path}/${imgRatioSquare}.${character.thumbnail.extension}`;
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
      newParagraph.textContent = "Appeared in x comics";
      newDiv.appendChild(newParagraph);
   });
};

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
// LEGACY CODE

//getCharacterData().then(addCharactersToPage);

/* if (!hiddenCharacters[character.id]) {
         characterContainer.appendChild(newDiv);
         newDiv.appendChild(newImg);
         newDiv.classList.add("character-item");
         newImg.src = characterImage;
         characterNameElement.textContent = characterName;
         newDiv.appendChild(characterNameElement);
         newParagraph.textContent = "Appeared in x comics";
         newDiv.appendChild(newParagraph);
      } */
