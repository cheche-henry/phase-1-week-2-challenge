// Your code here
//Fetch Character Names
function fetchCharacterNames() {
  return fetch(`http://localhost:3000/characters`).then((response) => response.json());
}
function renderCharacterNames(character) {
  const characterBar = document.getElementById("character-bar");
  // create span in webpage
  const span = document.createElement("span");
  // add character name to span
  span.innerHTML = character.name;
  characterBar.appendChild(span);
  span.id = character.id;
  // add event listener click to span
  span.addEventListener("click", onSpanCharacterClick);
}
// display all character names
fetchCharacterNames().then((characters) => {
  characters.forEach((character) => {
    renderCharacterNames(character);
  });
});

//Fetching character details with id
function fetchCharacterDetails(id) {
  return fetch(`http://localhost:3000/characters/${id}`).then((response) => response.json());
}
// targets span.id
function onSpanCharacterClick(event) {
  fetchCharacterDetails(event.target.id).then(renderCharacterDetails);
}

function renderCharacterDetails(character) {
  
  //changes name depending on id
  const charName = document.getElementById("name");
  charName.innerText = character.name;
// changes image depending on id
  const charImg = document.getElementById("image");
  charImg.src = character.image;
// changes votes depending on id
  const charVotes = document.getElementById("vote-count");
  charVotes.innerText = character.votes;
}

//Form Submission and Updating Votes
document.getElementById("votes-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const votesForm = event.target;
  const votes = document.getElementById("vote-count");
  // adds votes and gives total
  votes.innerText = parseInt(votesForm.votes.value) + parseInt(votes.innerText);
  votesForm.reset();
});

//Reset Button Functionality
document.getElementById("reset-btn").addEventListener("click", () => {

  document.getElementById("vote-count").innerText = 0;
});

document.addEventListener("DOMContentLoaded", function () {
  fetchCharacterNames();
  fetchCharacterDetails();
});
