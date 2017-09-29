$(document).ready(function(){
  const DATA = {
    getPokemonData: () => {
      return fetch('https://mutably.herokuapp.com/pokemon')
      .then(response =>{
          return response.json();
         }).then(pokemonFromMutably => {
             let pokedex = []
             let pokemonData = pokemonFromMutably.pokemon
             pokemonData.forEach(function(pokemon){
               let singlePokemon = {}
               singlePokemon.id = pokemon._id;
               singlePokemon.name = pokemon.name;
               singlePokemon.pokedexNumber = pokemon.pokedex;
               singlePokemon.evolves_from = pokemon.evolves_from;
               singlePokemon.image = pokemon.image;
               pokedex.push(singlePokemon)
          })
          return pokedex
      })
    },
    createPokemon: () => {
      console.log('placeholder')
    },
    updatePokemon: () => {
      console.log('placeholder')
    },
    deletePokemon: () => {
      console.log('placeholder')
    }
  }

  const UI = {
    appendPokemonToHtml: (fetchedPokemon) => {
      console.log('hmmmmmmm', fetchedPokemon)
      $('.list-group').empty()
      $.each(fetchedPokemon, function(key, value){
        $('.list-group').append('<li><button class="btn-primary edit-button">EDIT</button>'
        + '<button class="btn-danger delete-button">DELETE</button>'
        + '<button class="btn-info cancel-button">CANCEL</button><br>'
        + '<img class="pokemon-image" src='+value.image+'>'
        + '<div class="view-pokemon-info">'
        + ' <p class="data-id"> '+value.id+'</p>'
        + ' <b>Name:</b> <p class="pokemon-name">'+value.name+ '</p>'
        + ' <b>Pokédex No:</b> <p class="pokedex-number">'+value.pokedexNumber+ '</p>'
        + ' <b>Evolves From:</b> <p class="evolves-from">'+value.evolves_from+'</p><br>'
        + '</div>'
        + '<form class="edit-pokemon-form">'
        + ' <b>Name:</b> <input class="form-control name-edit" type="text" value= '+value.name+' </input>'
        + ' <b>Pokédex No:</b> <input class="form-control pokedex-number-edit" type="text" value= '+value.pokedexNumber+' </input>'
        + ' <b>Evolves From:</b> <input class="form-control evolves-from-edit" type="text" value= '+value.evolves_from+' </input>'
        + ' <b>Image URL:</b> <input class="form-control image-url-edit" type="text" value= '+value.image+' </input>'
        + '</form></li>')
      });
    }
  }

  const CONTROLLER = {
    displayPokemon: () => {
      DATA.getPokemonData().then((pokedex) => { //Cannot read property 'then' of undefined
      UI.appendPokemonToHtml(pokedex)
      })
    }
  }

  $('.get-pokemon-button').on('click', function() {
      CONTROLLER.displayPokemon();
  });


});
