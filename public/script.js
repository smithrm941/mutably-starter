console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  $('.get-pokemon').on('click', function() {
    $.getJSON('https://mutably.herokuapp.com/pokemon', function(data) {
      $.each(data.pokemon, function(key, value){
        $('.list-group').append('<li> <img src='+value.image+'><br>Name: '+value.name+' Pokédex No.: '+value.pokedex+' Evolves From:'+value.evolves_from+'</li>')
      });
    });
  });
});
