const pokemonName = document.getElementById("pokemonName");
const searchButton = document.getElementById("search_btn");

const pokemonSearch = async term => {
    const url = `https://pokeapi.co/api/v2/pokemon/${term}`;
    const response = await fetch(url);
    
    if( response.status == 404 || response.statusText == "Not Found") {
        console.log("not found");
        document.getElementById("show_error").classList.add('show');
        document.getElementById("show_error").classList.remove("hidden");
        return
    }

    const pokemon = await response.json();
    console.log("pokemon", pokemon);

    document.getElementById('update_image').setAttribute('src', pokemon.sprites.other.dream_world.front_default);

}

searchButton.addEventListener('click', () => pokemonSearch(pokemonName.value));