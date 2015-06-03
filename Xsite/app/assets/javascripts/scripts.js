$(function() {
  console.log("scripts.js linked");

    $('form').submit(function(e){
      e.preventDefault();
      var field = $('.fb_url',this), URL = field.val();
      console.log(URL)
    });

});