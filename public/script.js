const pokemonContainer = document.getElementById("container");
const searchBtn = document.getElementById("search");
const searchTerm = document.getElementById("search-term");
const total = 153;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);
const fetchPokemons = async () => {
    for (let i = 1; i <= total; i++) {
        await getPokemon(i);
    }
};
const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
};
searchBtn.addEventListener("click", async () => {
	pokemonContainer.innerHTML = " ";
	const search = searchTerm.value;
	if (!search) {
		location.reload();
	}
	else {
		const pokemon = await getPokemonBySearch(search);
		if (pokemon) {
			createPokemonCard(pokemon);
		}
	}
});
async function getPokemonBySearch(term){
	const url = `https://pokeapi.co/api/v2/pokemon/${term}`;
	const resp = await fetch(url);
	const pokemon = await resp.json();
	return pokemon;
};
function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
        <div class="container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" style= "width:300px;"/>
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;
	pokemonEl.innerHTML = pokeInnerHTML;
	pokemonContainer.appendChild(pokemonEl);
}
fetchPokemons();

const floatingBtn = document.querySelector(".floating-btn");
const closeBtn = document.querySelector(".close-btn");
const socialContainer = document.querySelector(".social-container");

floatingBtn.addEventListener("click", () => {
	socialContainer.classList.toggle("visible");
});
closeBtn.addEventListener("click", () => {
	socialContainer.classList.remove("visible");
});