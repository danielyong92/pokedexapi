const pokemonName = document.getElementById("pokemonName");
const searchButton = document.getElementById("search_btn");
const saveButton = document.getElementById("save_btn");
let pokemonImage = document.getElementById("update_image");

//Pokemon Stats
let pokemonStats = document.getElementById("pokemon-stats");
let pokemonHeight = document.getElementById("pokemon-height");
let pokemonWeight = document.getElementById("pokemon-weight");
let pokemonType = document.getElementById("pokemon-type");
let pokemonOrder = document.getElementById("pokemon-order");

let pokemonData;

const pokemonSearch = async term => {
  const url = `https://pokeapi.co/api/v2/pokemon/${term}`;
  const response = await fetch(url);

  const pokemon = await response.json();
  pokemonData = pokemon;
  console.log("pokemon", pokemon);

  // document.getElementById('update_image').setAttribute('src', pokemon.sprites.other.dream_world.front_default);
  saveButton.style.display = "block";
  pokemonImage.style.display="block";

  document
    .getElementById("update_image")
    .setAttribute("src", pokemon.sprites.front_default);
  document.getElementById("pokemon-name").innerHTML = `Name: ${pokemon.name}`;
  pokemonHeight.innerHTML = pokemon.height;
  pokemonWeight.innerHTML = pokemon.weight;
  pokemonOrder.innerHTML = pokemon.order;

  let array = pokemon.types
  array.forEach( x => {
      console.log("name", x.type.name);
      pokemonType.innerHTML += `${x.type.name} `});
  
};

const appendPokemon = pokemonData => {
  let carouselDiv = document.getElementById("carousel");
  let images = document.createElement("img");
  images.setAttribute("src", pokemonData);
  carouselDiv.appendChild(images);
};

const flipPokemon = pokemonData => {
  let imageSrc = document.getElementById("update_image").src;
  const backside = pokemonData.sprites.back_default;
  const frontside = pokemonData.sprites.front_default;

  if (imageSrc == frontside) {
    pokemonStats.style.display = "block";
    pokemonImage.setAttribute("src", backside);
  } else {
    document.getElementById("update_image").setAttribute("src", frontside);
    pokemonStats.style.display = "none";
  }
};

searchButton.addEventListener("click", () => pokemonSearch(pokemonName.value));
saveButton.addEventListener("click", () =>
  appendPokemon(pokemonData.sprites.front_default)
);
pokemonImage.addEventListener("click", () => flipPokemon(pokemonData));
