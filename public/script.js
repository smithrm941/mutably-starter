console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  $('.get-pokemon').on('click', function() {
    $.getJSON('https://mutably.herokuapp.com/pokemon', function(data) {
      $('.list-group').empty();
      $.each(data.pokemon, function(key, value){
        $('.list-group').append('<button class="edit-button">EDIT</button><br>'
        + '<li> <img class="pokemon-image" src='+value.image+'><br>'
        + '<b>Name:</b> <p class="pokemon-name">'+value.name+ '</p>'
        + ' <b>Pokédex No:</b> <p class="pokedex-number">'+value.pokedex+ '</p>'
        + ' <b>Evolves From:</b> <p class="evolves-from">'+value.evolves_from+ '</p></li><br>')
      });
    });
  });
  $('.list-group').on('click','.edit-button', function() {
    $(this).removeClass('edit-button').addClass('save-button').html('SAVE');
  });
  $('.list-group').on('click','.save-button', function() {
    $(this).removeClass('save-button').addClass('edit-button').html('EDIT');
  });
});
