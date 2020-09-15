// https://www.youtube.com/watch?v=J3KGuDRr0tE

const API_KEY = "4d772a2f024b736731088cbd1691d445";
const charactersURL = `https://gateway.marvel.com:443/v1/public/events/29/characters?limit=60&apikey=${API_KEY}`;

// IMAGE VARIANTS: https://developer.marvel.com/documentation/images
const imgRatioPortrait = "portrait_incredible"; // 216 x 324px
const imgRatioSquare = "standard_fantastic"; // 250 x 250px
const imgRatioLandscape = "landscape_amazing"; // 250 x 156px

// Local Storage (55 min)

function getCharacterData() {
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

function addCharactersToPage(characterData) {
   console.log(characterData.data.results);
}

getCharacterData().then(addCharactersToPage);
