console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  $('.get-pokemon').on('click', function() {
    $.getJSON('https://mutably.herokuapp.com/pokemon', function(data) {
      console.log(data);

    });
  });
});
