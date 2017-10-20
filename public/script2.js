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
    submitNewPokemon: function() {
      let newPokemonName = $('.new-pokemon-name').val();
      let newPokedexNum = $('.new-pokemon-number').val();
      let newEvolvesFrom = $('.new-pokemon-evolves-from').val();
      let newImageUrl = $('.new-pokemon-image').val();
      return DATA.createPokemon(newPokemonName, newPokedexNum, newEvolvesFrom, newImageUrl)
    },
    createPokemon: ( newPokemonName, newPokedexNum, newEvolvesFrom, newImageUrl ) => {
      return fetch('https://mutably.herokuapp.com/pokemon', {
	      method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `name=${newPokemonName}&pokedex=${newPokedexNum}&evolves_from=${newEvolvesFrom}&image=${newImageUrl}`
      });
    },
    editPokemon: () => {
      let editPokemonForm = $(event.target).siblings('.edit-pokemon-form')
      let hiddenPokemonId = $(editPokemonForm.children()[0]).html()
      let editFormName = $(editPokemonForm.children()[2]).val()
      let editFormPokedexNum = $(editPokemonForm.children()[4]).val()
      let editFormEvolvesFrom = $(editPokemonForm.children()[6]).val()
      let editFormImageUrl = $(editPokemonForm.children()[8]).val()
      return DATA.updatePokemon(hiddenPokemonId, editFormName, editFormPokedexNum, editFormEvolvesFrom, editFormImageUrl)
    },
    updatePokemon: ( hiddenPokemonId, editFormName, editFormPokedexNum, editFormEvolvesFrom, editFormImageUrl ) => {
      let individualPokemonEndpoint = (`https://mutably.herokuapp.com/pokemon/${hiddenPokemonId}`).replace(/\s/g, '');
      return fetch(individualPokemonEndpoint, {
        method: 'put',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `name=${editFormName}&pokedex=${editFormPokedexNum}&evolves_from=${editFormEvolvesFrom}&image=${editFormImageUrl}`
      })
    },
    deletePokemon: () => {
      let pokemonInfo = $(event.target).siblings('.view-pokemon-info')
      let hiddenPokemonId = $(pokemonInfo.children()[0]).html()
      let individualPokemonEndpoint = (`https://mutably.herokuapp.com/pokemon/${hiddenPokemonId}`).replace(/\s/g, '');
      return fetch(individualPokemonEndpoint, {
        method: 'delete'
      })
    }
  }

  const UI = {
    appendPokemonToHtml: (fetchedPokemon) => {
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
        + ' <p class="data-id"> '+value.id+'</p>'
        + ' <b>Name:</b> <input class="form-control name-edit" type="text" value= '+value.name+' </input>'
        + ' <b>Pokédex No:</b> <input class="form-control pokedex-number-edit" type="text" value= '+value.pokedexNumber+' </input>'
        + ' <b>Evolves From:</b> <input class="form-control evolves-from-edit" type="text" value= '+value.evolves_from+' </input>'
        + ' <b>Image URL:</b> <input class="form-control image-url-edit" type="text" value= '+value.image+' </input>'
        + '</form></li>')
      });
    },
    toggleCreateForm: () => {
      $('.create-pokemon-form').toggle()
    },
    displayEditForm: () => {
      $(event.target).removeClass('btn-primary edit-button').addClass('btn-success save-button').html('SAVE');
      $(event.target).siblings('.delete-button').show();
      $(event.target).siblings('.cancel-button').show();
      $(event.target).siblings('.view-pokemon-info').hide();
      $(event.target).siblings('.edit-pokemon-form').show();
    },
    hideEditForm: () => {
      $('.save-button').removeClass('btn-success save-button').addClass('btn-primary edit-button').html('EDIT');
      $('.cancel-button').hide();
      $(event.target).siblings('.delete-button').hide();
      $(event.target).siblings('.view-pokemon-info').show();
      $(event.target).siblings('.edit-pokemon-form').hide();
    },
    deleteConfirmation: () => {
      let editPokemonForm = $(event.target).siblings('.edit-pokemon-form')
      let pokemonToDelete = $(editPokemonForm.children()[2]).val()
      return confirm(`Are you sure you want to delete ${pokemonToDelete}?`)
    },
    createPokemonConfirmation: () => {
      let createdPokemonNameBox = $(event.target).siblings('.new-pokemon-name')
      let createdPokemon = $(createdPokemonNameBox).val()
      return confirm(`Are you sure you want to add ${createdPokemon} to the list?`)
    },
    clearCreateForm: () => {
      $('.new-pokemon-name').val('')
      $('.new-pokemon-number').val('')
      $('.new-pokemon-evolves-from').val('')
      $('.new-pokemon-image').val('')
    }
  }

  const CONTROLLER = {
    displayPokemon: () => {
      DATA.getPokemonData().then((pokedex) => {
      UI.appendPokemonToHtml(pokedex)
      })
    },
    toggleCreateForm: () => {
      UI.toggleCreateForm()
    },
    createPokemon: () => {
      DATA.submitNewPokemon().then(() => {
        CONTROLLER.toggleCreateForm()
        CONTROLLER.displayPokemon()
        UI.clearCreateForm()
      })
    },
    displayEditForm: () => {
      UI.displayEditForm()
    },
    editPokemon: () => {
      DATA.editPokemon().then(()=> {
        CONTROLLER.displayPokemon()
      })
    },
    hideEditForm: () => {
      UI.hideEditForm()
    },
    deletePokemon: () => {
      if(UI.deleteConfirmation()){
        DATA.deletePokemon().then(() => {
          CONTROLLER.displayPokemon()
        })
      }
    }
  }

  $('.get-pokemon-button').on('click', function() {
    CONTROLLER.displayPokemon();
  });

  $('.display-create-form-button').on('click', function() {
    CONTROLLER.toggleCreateForm();
  })

  $('.create-pokemon-button').on('click', function() {
    event.preventDefault()
    if(UI.createPokemonConfirmation()){
      CONTROLLER.createPokemon()
    }
  })

  $('.list-group').on('click','.edit-button', CONTROLLER.displayEditForm);

  $('.list-group').on('click', '.cancel-button', CONTROLLER.hideEditForm);

  $('.list-group').on('click', '.save-button', CONTROLLER.editPokemon);

  $('.list-group').on('click', '.delete-button', CONTROLLER.deletePokemon);
});
