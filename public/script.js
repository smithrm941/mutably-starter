console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  $('.get-pokemon').on('click', function() {
    $.getJSON('https://mutably.herokuapp.com/pokemon', function(data) {
      $('.list-group').empty();
      $.each(data.pokemon, function(key, value){
        $('.list-group').append('<button>EDIT</button><br>'
        + '<li> <img src='+value.image+'><br>'
        + '<b>Name:</b> '+value.name+ ''
        + ' <b>Pokédex No:</b> '+value.pokedex+ ''
        + ' <b>Evolves From:</b> '+value.evolves_from+ '</li><br>')
        $('.list-group button').addClass('edit-button');
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
