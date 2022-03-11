const pokemonName = document.getElementById("pokemonName");
const searchButton = document.getElementById("search_btn");
const saveButton = document.getElementById("save_btn");
const pokemonImage = document.getElementById("update_image");

let pokemonData;
const pokemonSearch = async term => {
    const url = `https://pokeapi.co/api/v2/pokemon/${term}`;
    const response = await fetch(url);
    
    const pokemon = await response.json();
    console.log("pokemon", pokemon);

    // document.getElementById('update_image').setAttribute('src', pokemon.sprites.other.dream_world.front_default);
    document.getElementById('update_image').setAttribute('src', pokemon.sprites.front_default);
    document.getElementById('pokemon-name').innerHTML = `Name: ${pokemon.name}`;
    pokemonData = pokemon;
}

const appendPokemon = (pokemonData) => {
    let carouselDiv = document.getElementById("carousel");
    let images = document.createElement("img");
    images.setAttribute('src', pokemonData);
    carouselDiv.appendChild(images);
}

const flipPokemon = (pokemonData) => {
    let imageSrc = document.getElementById("update_image").src;
    const backside = pokemonData.sprites.back_default;
    const frontside = pokemonData.sprites.front_default;

    if (imageSrc == pokemonData.sprites.front_default) {
        document.getElementById('update_image').setAttribute('src', backside);
    }
    else {
        document.getElementById('update_image').setAttribute('src', frontside);
    }
}

searchButton.addEventListener('click', () => pokemonSearch(pokemonName.value));
saveButton.addEventListener('click', () => appendPokemon(pokemonData.sprites.front_default));
pokemonImage.addEventListener('click', ()=> flipPokemon(pokemonData));

    

