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
let frontPokemonImage;
let backPokemonImage;
let currentPokemonImage;
const savedPokemon = localStorage.getItem("pokemonData")
  ? JSON.parse(localStorage.getItem("pokemonData"))
  : null;
const inputSearch = localStorage.getItem("inputSearch")
  ? localStorage.getItem("inputSearch")
  : null;

let pokemon;
const pokemonSearch = async term => {
  const url = `https://pokeapi.co/api/v2/pokemon/${term}`;
  const response = await fetch(url);

  pokemon = await response.json();
  localStorage.setItem("pokemonData", JSON.stringify(pokemon));
  localStorage.setItem("inputSearch", term);

  frontPokemonImage = pokemon.sprites.front_default;
  backPokemonImage = pokemon.sprites.back_default;
  currentPokemonImage = frontPokemonImage;

  // document.getElementById('update_image').setAttribute('src', pokemon.sprites.other.dream_world.front_default);
  saveButton.style.display = "block";
  pokemonImage.style.display = "block";

  document
    .getElementById("update_image")
    .setAttribute("src", currentPokemonImage);
  pokemonName.innerHTML = `Name: ${pokemon.name}`;
  pokemonHeight.innerHTML = pokemon.height;
  pokemonWeight.innerHTML = pokemon.weight;
  pokemonOrder.innerHTML = pokemon.order;
  let array = pokemon.types;
  array.forEach(x => {
    pokemonType.innerHTML = x.type.name;
  });

  pokemonImage.onclick = () => {
    if (currentPokemonImage === frontPokemonImage) {
      pokemonStats.style.display = "block";
      pokemonImage.setAttribute("src", backPokemonImage);
      currentPokemonImage = backPokemonImage;
    } else {
      document
        .getElementById("update_image")
        .setAttribute("src", frontPokemonImage);
      currentPokemonImage = frontPokemonImage;
      pokemonStats.style.display = "none";
    }
  };
};

// const onClickPopulate = () => {
//     document
//       .getElementById("update_image")
//       .setAttribute("src", pokemonData.sprites.front_default);
//     document.getElementById(
//       "pokemon-name"
//     ).innerHTML = `Name: ${pokemonData.name}`;
//     pokemonHeight.innerHTML = pokemonData.height;
//     pokemonWeight.innerHTML = pokemonData.weight;
//     pokemonOrder.innerHTML = pokemonData.order;
//     let array = pokemonData.types;
//     array.forEach(x => {
//       pokemonType.innerHTML = x.type.name;
//     });
// }

const imageOnClick = images => {
  images.onclick = () => {
    document
      .getElementById("update_image")
      .setAttribute("src", pokemon.sprites.front_default);
    frontPokemonImage = pokemon.sprites.front_default;
    backPokemonImage = pokemon.sprites.back_default;
    currentPokemonImage = frontPokemonImage;
    document.getElementById("pokemon-name").innerHTML = `Name: ${pokemon.name}`;
    pokemonHeight.innerHTML = pokemon.height;
    pokemonWeight.innerHTML = pokemon.weight;
    pokemonOrder.innerHTML = pokemon.order;
    let array = pokemon.types;
    array.forEach(x => {
      pokemonType.innerHTML = x.type.name;
    });
  };
};

const appendPokemon = pokemon => {
  let carouselDiv = document.getElementById("carousel");
  let images = document.createElement("img");
  images.setAttribute("src", pokemon.sprites.front_default);
  images.setAttribute("height", 150);
  images.setAttribute("width", 150);
  carouselDiv.appendChild(images);

  imageOnClick(images);
};

// const flipPokemon = pokemonData => {
//   let imageSrc = document.getElementById("update_image").src;
//   const backside = pokemonData.sprites.back_default;
//   const frontside = pokemonData.sprites.front_default;

//   if (imageSrc === frontside) {
//     pokemonStats.style.display = "block";
//     pokemonImage.setAttribute("src", backside);
//   } else {
//     document.getElementById("update_image").setAttribute("src", frontside);
//     pokemonStats.style.display = "none";
//   }
// };

searchButton.addEventListener("click", () => pokemonSearch(pokemonName.value));
saveButton.addEventListener("click", () => appendPokemon(pokemon));
// pokemonImage.addEventListener("click", () => flipPokemon(pokemonData));

if (savedPokemon && inputSearch) {
  //this is to populate the search with session value
  pokemonName.value = inputSearch;

  let carouselDiv = document.getElementById("carousel");
  let images = document.createElement("img");
  images.setAttribute("src", savedPokemon.sprites.front_default);
  images.setAttribute("height", 150);
  images.setAttribute("width", 150);
  carouselDiv.appendChild(images);

  images.onclick = () => {
    document
      .getElementById("update_image")
      .setAttribute("src", savedPokemon.sprites.front_default);
    frontPokemonImage = savedPokemon.sprites.front_default;
    backPokemonImage = savedPokemon.sprites.back_default;
    currentPokemonImage = frontPokemonImage;
    document.getElementById("pokemon-name").innerHTML = `Name: ${pokemon.name}`;
    pokemonHeight.innerHTML = pokemon.height;
    pokemonWeight.innerHTML = pokemon.weight;
    pokemonOrder.innerHTML = pokemon.order;
    let array = savedPokemon.types;
    array.forEach(x => {
      pokemonType.innerHTML = x.type.name;
    });
  };

//   saveButton.onclick = () => storePokemon(savedData);
}
