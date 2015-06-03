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
      var email = pageData.email // this may require a page token
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

      var xsiteData = {
        fb_id: fb_id,
        name: name,
        about: about,
        category: category,
        description: description,
        company_overview: company_overview,
        mission: mission,
        year_founded: founded,
        email: email,
        phone: phone,
        street: street,
        city: city,
        zip: zip,
        country: country,
        latitude: latitude,
        longitude: longitude,
        facebook_url: facebook_url,
        cover_photo: cover_photo,
        logo: logo ,
        hours: hours
      }
      // lets save this site to the database
      $.ajax({
        type: "POST",
        url: "api/websites",
        data: xsiteData,
        success: function(resp){ console.log ("Saved ID#" + resp.id) }
      })
   
    }); // end ajax call 
  }); //  end submit event
}); // end document ready