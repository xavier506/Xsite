$(function() {
  console.log("scripts.js linked");

    $('form').submit(function(e){
      e.preventDefault();
      var field = $('.fb_url',this), FBURL = field.val();  
      var APIURL = "https://graph.facebook.com/?ids=" + FBURL

      // retrieve general page data
      $.getJSON( APIURL, function( data ) {
        var pageName = Object.keys(data)[0]; // returns first key
        var pageData = data[pageName] // object with data that we are interested in
        
        var fb_id = pageData.id
        var logo = "https://graph.facebook.com/" + fb_id + "/picture?url"
        var cover_photo = pageData.cover.source
        var name = pageData.name
        // var email = pageData.email // this may require a page token
        var about = pageData.about
        var company_overview = pageData.company_overview
        var description = pageData.description
        var mission = pageData.mission
        var founded = pageData.founded
        var category = pageData.category
        var facebook_url = pageData.link
        var phone = pageData.phone
        var street = pageData.location.street
        var city = pageData.location.city
        var country = pageData.location.country
        var zip = pageData.location.zip
        var latitude = pageData.location.latitude
        var longitude = pageData.location.longitude
        var hours = pageData.hours

        console.log(fb_id)
        console.log(logo)
        // console.log(email)
        console.log(name)
        console.log(about)
        console.log(mission)
        console.log(description)
        console.log(company_overview)
        console.log(founded)
        console.log(category)
        console.log(facebook_url)
        console.log(cover_photo)

        console.log(phone)
        console.log(hours)

        console.log(street)
        console.log(city)
        console.log(country)
        console.log(zip)
        console.log(latitude)
        console.log(longitude)

      });
    });
});