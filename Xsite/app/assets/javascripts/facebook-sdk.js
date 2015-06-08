$(function() {
console.log("SDK linked");
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '827486570639909',
        status     : true,   // check login status on every page  
        cookie     : true,  // cookies for server to access the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.2' // use version 2.2
      });
    };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
});


 // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    // console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      // testAPI();
      createUser(response);
      var id = location.hash.replace("#templates?id=","");
      var preview = $("<a href='/websites/" + id + "' class='button-xlarge pure-button pure-button-primary'>View my Site!</a>");
          preview.appendTo("#logins");

    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response){
      statusChangeCallback(response);
    }), true ;
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
        console.log(response);
    });
  }


  // Lets create a user in the server
  function createUser(response) {
    console.log("Ok you are logged in lets make a user for you!");
    // console.log(response)
    // console.log(response.authResponse.userID)
    // console.log(response.authResponse.accessToken)
    FB.api('/me', function(user) {

      var userData = {facebook_id: user.id, email: user.email, name: user.name};
      $.ajax({
            type: "POST",
            url: "/api/users",
            data: userData,
            success: function(resp){ 
              console.log ("Saved USER ID#" + resp.id);
              if (location.hash !== '' ){ 
              // get website ID
              var siteID = location.hash.replace("#templates?id=","");
                $.ajax({
                  type:"PATCH",
                  url: "/api/websites/" + siteID,
                  data: {user_id: resp.id},
                    success: function(resp){
                      console.log("user id " + resp.id + "saved to website id" + siteID)
                    }
                });
              }
            }
          });
      createSession(user);
      console.log('Successful login for: ' + user.name);
      document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + user.name + '!';
    });
  }
  
  function showUserSites(user){
    console.log("lets get the sites that beong to user" + user)
  }

  function createSession(user){
    console.log("Here it is:" + user)
    var user_id = user.id;
    $.ajax({
          type: "POST",
          url: "/login",
          data: {user_id: user_id},
          success: function(user){ 
            console.log("Xsite user session created!")
            console.log(user)
            showUserSites(user_id);
            console.log(user_id)
          }
    });
  };