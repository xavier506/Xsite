$( document ).ready(function() {
  console.log("script linked");
  
  // Load facebook API
  var pageID = "182364248638524"

  console.log(FB)
  console.log("ready then")
  /* make the API call */
    FB.api(
      '/page/182364248638524', // page id
      function (response) {
        if (response && !response.error) {
        /* handle the result */
        console.log(response);
        }
      }
    );

  $('form').submit(function(){
    var field     = $('.fb_url',this), URL = field.val();
    var hasScheme = ( URL.indexOf( 'http://' ) === 0 || URL.indexOf( 'https://' ) === 0 );
    var isFBURL   = ( URL.indexOf( 'facebook.com' ) !== -1 );
    $('.hidden-input-for-unsanitized').val(URL);
    if ( URL && !hasScheme && !isFBURL ) {
      URL = 'http://www.facebook.com/'+URL;
    } else if ( URL && isFBURL && URL.indexOf( 'www.facebook.com' ) === -1 ) {
      URL = URL.replace( 'facebook.com', 'www.facebook.com' );
    } else if ( URL && !hasScheme ) {
      URL = 'http://'+URL;
    }
    field.val(URL);
    return ( URL != '' );
    console.log(URL)
  });
});