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
        + '<form class="edit-pokemon">'
        + ' <b>Name:</b> <input class="name-edit" type="text" value= '+value.name+' </input>'
        + ' <b>Pokédex No:</b> <input class="pokedex-number-edit" type="text" value= '+value.pokedex+' </input>'
        + ' <b>Evolves From:</b> <input class="evolves-from-edit" type="text" value= '+value.evolves_from+' </input>'
        + '</form></li>')
        });
      });
    });

  $('.create-pokemon-button').on('click', function() {
    $('.create-pokemon-form').toggle();
  });

  $('.create-pokemon-form').on('submit', function(event) {
    event.preventDefault();
    let newPokemonName = $('.submitted-name').val();
    let newPokedexNum = $('.submitted-pokedex-num').val();
    let newEvolvesFrom = $('.submitted-evolves-from').val();
    let newImgUrl = $('.submitted-img-url').val();
    $.ajax({
      url: 'https://mutably.herokuapp.com/pokemon',
      method: 'POST',
      data: "name=" + newPokemonName + '&' + "pokedex=" + newPokedexNum  + '&' + "evolves_from=" + newEvolvesFrom  + '&' + "image=" + newImgUrl,
      success: function() {
        $('.submitted-name').val('');
        $('.submitted-pokedex-num').val('');
        $('.submitted-evolves-from').val('');
        $('.submitted-img-url').val('');
        $('.create-pokemon-form').hide();
      }
    });
  })

    $('.list-group').on('click','.edit-button', function() {
      $(this).removeClass('edit-button').addClass('save-button').html('SAVE');
      $(this).siblings('.view-pokemon-info').hide();
      $(this).siblings('.edit-pokemon').show();
    });

    $('.list-group').on('click','.save-button', function() {
      $(this).removeClass('save-button').addClass('edit-button').html('EDIT');
      $(this).siblings('.edit-pokemon').hide();
      $(this).siblings('.view-pokemon-info').show();
      //PUT request here?
    });
});
