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
        + '<form class="edit-pokemon">'
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

const submitNewPokemon = function() {
  let newPokemonName = $('.submitted-name').val();
  let newPokedexNum = $('.submitted-pokedex-num').val();
  let newEvolvesFrom = $('.submitted-evolves-from').val();
  let newImageUrl = $('.submitted-image-url').val();

  $.ajax({
    url: 'https://mutably.herokuapp.com/pokemon',
    method: 'POST',
    data: "name=" + newPokemonName + '&' + "pokedex=" + newPokedexNum  + '&' + "evolves_from=" + newEvolvesFrom  + '&' + "image=" + newImageUrl,
    beforeSend: function(){
      alert(`Adding ${newPokemonName}`)
    },
    success: function() {
      $('.submitted-name').val('');
      $('.submitted-pokedex-num').val('');
      $('.submitted-evolves-from').val('');
      $('.submitted-image-url').val('');
      $('.create-pokemon-form').hide();
    }
  });
}

  $('.create-pokemon-form').on('submit', function(event) {
    event.preventDefault();
    let newPokemonName = $('.submitted-name').val();
    let confirmSubmission = confirm(`Are you sure you want to add ${newPokemonName}?`)

    if(confirmSubmission){
      submitNewPokemon();
    }
    getPokemon();
  })

//UPDATE existing pokemon
    $('.list-group').on('click','.edit-button', function() {
      $(this).removeClass('btn-info edit-button').addClass('btn-success save-button').html('SAVE');
      $(this).siblings('.delete-button').show();
      $(this).siblings('.cancel-button').show();
      $(this).siblings('.view-pokemon-info').hide();
      $(this).siblings('.edit-pokemon').show();
    });

    $('.list-group').on('click','.save-button', function() {
      $(this).removeClass('btn-success save-button').addClass('btn-info edit-button').html('EDIT');
      $(this).siblings('.edit-pokemon').hide();
      $(this).siblings('.view-pokemon-info').show();

      let editedPokemonId = $(this).siblings('.view-pokemon-info').children('.data-id').html()
      let editedPokemonUrl = 'https://mutably.herokuapp.com/pokemon/' + editedPokemonId
      let editedPokemonUrlNoSpaces = editedPokemonUrl.replace(/\s+/g, '');
      let editedPokemonName = $(this).siblings('.edit-pokemon').children('.name-edit').val();
      let editedPokedexNum = $(this).siblings('.edit-pokemon').children('.pokedex-number-edit').val();
      let editedEvolvesFrom = $(this).siblings('.edit-pokemon').children('.evolves-from-edit').val();
      let editedImageUrl = $(this).siblings('.edit-pokemon').children('.image-url-edit').val()

      let confirmEdits = confirm('Save these changes?')

      if(confirmEdits){
        $.ajax({
          url: editedPokemonUrlNoSpaces,
          method: 'PUT',
          data: "name=" + editedPokemonName + '&' + "pokedex=" + editedPokedexNum  + '&' + "evolves_from=" + editedEvolvesFrom + '&' + "image="  + editedImageUrl,
          success: function() {
            getPokemon();
          }
        });
      }
        getPokemon();

    });

//DELETE existing pokemon
  $('.list-group').on('click', '.delete-button', function() {
    let deletedPokemon = $(this).siblings('.view-pokemon-info').children('.pokemon-name').html()
    let deleteConfirmation = confirm(`Are you sure you want to delete ${deletedPokemon}?`)

    if(deleteConfirmation){
      let deletedPokemonId = $(this).siblings('.view-pokemon-info').children('.data-id').html()
      let deletedPokemonUrl = 'https://mutably.herokuapp.com/pokemon/' + deletedPokemonId
      let deletedPokemonUrlNoSpaces = deletedPokemonUrl.replace(/\s+/g, '');
      $.ajax({
        url: deletedPokemonUrlNoSpaces,
        method: 'DELETE',
        beforeSend: function(){
          alert(`Deleting ${deletedPokemon}`)
        },
        success: function() {
          getPokemon();
        }
      });
    }
  });

  //Go back to list of pokemon with no changes or deletion:
  $('.list-group').on('click', '.cancel-button', function() {
    getPokemon();
  });
});
