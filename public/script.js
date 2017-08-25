$(document).ready(function(){

  //READ existing pokemon

  const getPokemon = function(){
    $.getJSON('https://mutably.herokuapp.com/pokemon', function(data) {
      $('.list-group').empty();
      $.each(data.pokemon, function(key, value){
        $('.list-group').append('<li><button class="btn-info edit-button">EDIT</button>'
        + '<button class="btn-danger delete-button">DELETE</button>'
        + '<button class="btn-info cancel-button">CANCEL</button><br>'
        + '<img class="pokemon-image" src='+value.image+'>'
        + '<div class="view-pokemon-info">'
        + ' <p class="data-id"> '+value._id+'</p>'
        + ' <b>Name:</b> <p class="pokemon-name">'+value.name+ '</p>'
        + ' <b>Pokédex No:</b> <p class="pokedex-number">'+value.pokedex+ '</p>'
        + ' <b>Evolves From:</b> <p class="evolves-from">'+value.evolves_from+ '</p><br>'
        + '</div>'
        + '<form class="edit-pokemon-form">'
        + ' <b>Name:</b> <input class="form-control name-edit" type="text" value= '+value.name+' </input>'
        + ' <b>Pokédex No:</b> <input class="form-control pokedex-number-edit" type="text" value= '+value.pokedex+' </input>'
        + ' <b>Evolves From:</b> <input class="form-control evolves-from-edit" type="text" value= '+value.evolves_from+' </input>'
        + ' <b>Image URL:</b> <input class="form-control image-url-edit" type="text" value= '+value.image+' </input>'
        + '</form></li>')
        });
      });
  }

  $('.get-pokemon-button').on('click', function() {
      getPokemon();
    });

  //CREATE a new Pokemon

  $('.create-pokemon-button').on('click', function() {
    $('.create-pokemon-form').toggle();
  });

  const getNewPokemonFromForm = function() {
    let newPokemonName = $('.submitted-name').val();
    let newPokedexNum = $('.submitted-pokedex-num').val();
    let newEvolvesFrom = $('.submitted-evolves-from').val();
    let newImageUrl = $('.submitted-image-url').val();
    return {
      'newPokemonName': newPokemonName,
      'newPokedexNum': newPokedexNum,
      'newEvolvesFrom': newEvolvesFrom,
      'newImageUrl': newImageUrl
    }
  }

  const clearNewPokemonForm = function() {
    $('.submitted-name').val('');
    $('.submitted-pokedex-num').val('');
    $('.submitted-evolves-from').val('');
    $('.submitted-image-url').val('');
    $('.create-pokemon-form').hide();
  }

  const createNewPokemon = function(pokemon) {
    $.ajax({
      url: 'https://mutably.herokuapp.com/pokemon',
      method: 'POST',
      data: "name=" + pokemon.newPokemonName
      + '&' + "pokedex=" + pokemon.newPokedexNum
      + '&' + "evolves_from=" + pokemon.newEvolvesFrom
      + '&' + "image=" + pokemon.newImageUrl,
      beforeSend: function(){
        alert(`Adding ${pokemon.newPokemonName}`)
      },
      success: function() {
        clearNewPokemonForm();
        getPokemon()
      }
    });
  }

  $('.create-pokemon-form').on('submit', function(event) {
    event.preventDefault();
    let pokemon = getNewPokemonFromForm();
    let confirmSubmission = confirm(`Are you sure you want to add ${pokemon.newPokemonName}?`)
    if(confirmSubmission){
      createNewPokemon(pokemon);
    }
    getPokemon();
  })

  //UPDATE existing pokemon

  $('.list-group').on('click','.edit-button', function() {
    $(this).removeClass('btn-info edit-button').addClass('btn-success save-button').html('SAVE');
    $(this).siblings('.delete-button').show();
    $(this).siblings('.cancel-button').show();
    $(this).siblings('.view-pokemon-info').hide();
    $(this).siblings('.edit-pokemon-form').show();
  });

  const getUpdatesFromForm = function(_this) {
    let editedPokemonId = $(_this).siblings('.view-pokemon-info').children('.data-id').html()
    let editedPokemonUrl = 'https://mutably.herokuapp.com/pokemon/' + editedPokemonId
    let editedPokemonUrlNoSpaces = editedPokemonUrl.replace(/\s+/g, '');
    let editedPokemonName = $(_this).siblings('.edit-pokemon-form').children('.name-edit').val();
    let editedPokedexNum = $(_this).siblings('.edit-pokemon-form').children('.pokedex-number-edit').val();
    let editedEvolvesFrom = $(_this).siblings('.edit-pokemon-form').children('.evolves-from-edit').val();
    let editedImageUrl = $(_this).siblings('.edit-pokemon-form').children('.image-url-edit').val()
    return {
      'pokemonId': editedPokemonId,
      'pokemonUrl': editedPokemonUrlNoSpaces,
      'pokemonName': editedPokemonName,
      'pokedexNum': editedPokedexNum,
      'evolvesFrom': editedEvolvesFrom,
      'imageUrl': editedImageUrl
    }
  }

  const updatePokemonData = function(pokemon) {
    $.ajax({
      url: pokemon.pokemonUrl,
      method: 'PUT',
      data: "name=" + pokemon.pokemonName
      + '&' + "pokedex=" + pokemon.pokedexNum
      + '&' + "evolves_from=" + pokemon.evolvesFrom
      + '&' + "image="  + pokemon.imageUrl,
      success: function() {
        getPokemon();
      }
    });
  }

  $('.list-group').on('click','.save-button', function() {
    let confirmEdits = confirm('Save these changes?')

    if(confirmEdits){
      let pokemon = getUpdatesFromForm(this);
      updatePokemonData(pokemon)
    }
      getPokemon();
  });

  //DELETE existing pokemon

  const pokemonDataToDelete = function(_this){
    let deletedPokemon = $(_this).siblings('.view-pokemon-info').children('.pokemon-name').html()
    let deletedPokemonId = $(_this).siblings('.view-pokemon-info').children('.data-id').html()
    let deletedPokemonUrl = 'https://mutably.herokuapp.com/pokemon/' + deletedPokemonId
    let deletedPokemonUrlNoSpaces = deletedPokemonUrl.replace(/\s+/g, '');
    return {
      'deletedName': deletedPokemon,
      'deletedId': deletedPokemonId,
      'deletedUrl': deletedPokemonUrlNoSpaces,
    }
  }

  const deletePokemon = function(pokemon){
    $.ajax({
      url: pokemon.deletedUrl,
      method: 'DELETE',
      beforeSend: function(){
        alert(`Deleting ${pokemon.deletedName}`)
      },
      success: function() {
        getPokemon();
      }
    });
  }

  $('.list-group').on('click', '.delete-button', function() {
    let pokemon = pokemonDataToDelete(this);
    let deleteConfirmation = confirm(`Are you sure you want to delete ${pokemon.deletedName}?`)

      if(deleteConfirmation){
        deletePokemon(pokemon)
      }
      getPokemon();
    });

    //Go back to list of pokemon with no changes or deletion:
    $('.list-group').on('click', '.cancel-button', function() {
      getPokemon();
    });
});
