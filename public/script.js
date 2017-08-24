$(document).ready(function(){
  $('.get-pokemon').on('click', function() {

    $.getJSON('https://mutably.herokuapp.com/pokemon', function(data) {
      $('.list-group').empty();
      $.each(data.pokemon, function(key, value){
        $('.list-group').append('<li> <button class="edit-button">EDIT</button><br>'
        + '<img class="pokemon-image" src='+value.image+'><br>'
        + '<div class="view-pokemon-info">'
        + ' <b>Name:</b> <p class="pokemon-name">'+value.name+ '</p>'
        + ' <b>Pokédex No:</b> <p class="pokedex-number">'+value.pokedex+ '</p>'
        + ' <b>Evolves From:</b> <p class="evolves-from">'+value.evolves_from+ '</p><br>'
        + '</div>'
        + '<form class="edit-pokemon" hidden>'
        + ' <b>Name:</b> <input class="name-edit" type="text" value= '+value.name+' </input>'
        + ' <b>Pokédex No:</b> <input class="pokedex-number-edit" type="text" value= '+value.pokedex+' </input>'
        + ' <b>Evolves From:</b> <input class="evolves-from-edit" type="text" value= '+value.evolves_from+' </input>'
        + '</form></li>')
        });
      });
    });

    $('.list-group').on('click','.edit-button', function() {
      $(this).removeClass('edit-button').addClass('save-button').html('SAVE');
      $(this).siblings('.view-pokemon-info').hide();
      $(this).siblings('.edit-pokemon').show();
    });

    $('.list-group').on('click','.save-button', function() {
      $(this).removeClass('save-button').addClass('edit-button').html('EDIT');
      $(this).siblings('.edit-pokemon').hide();
      $(this).siblings('.view-pokemon-info').show();
    });
  });
