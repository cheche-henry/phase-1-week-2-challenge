// Your code here
// get elements from the index.html
const characterBar = document.getElementById("character-bar");
const detailedInfo = document.getElementById("detailed-info");
const namePar = document.getElementById("name");
const image = document.getElementById("image");
const voteCount = document.getElementById("vote-count");
const voteForm = document.getElementById("votes-form");

let currentCharacter;

voteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // add votes and show results
  currentCharacter.votes += parseInt(e.target.votes.value);
  showInfo(currentCharacter);

});
// fetch characters from db.json
fetch("http://localhost:3000/characters")
  .then((res) => res.json())
  .then(renderCharacters);

function renderCharacters(characters) {
    // display all characters
  characters.forEach(renderCharacter);
}

function renderCharacter(character) {
  // Create span element
  const characterSpan = document.createElement("span");
  characterSpan.innerText = character.name;
  // place span under character-bar
  characterBar.appendChild(characterSpan);
  // add event listener click that shows the character information
  characterSpan.addEventListener("click", () => {
    currentCharacter = character;
    showInfo(character);
  });
}

function showInfo(character) {
    // shows character name
  namePar.innerText = character.name;
  // displays character image
  image.src = character.image;
  voteCount.innerText = character.votes;
  fetch('http://localhost:3000/characters/1', {
  method: 'PATCH',
  body: JSON.stringify({
    votes: voteCount,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
}



