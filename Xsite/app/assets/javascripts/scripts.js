$(function() {
console.log("scripts.js linked");

//------------------------- BACKBONE VIEWS -------------------------// 
 
 // ----------------------- HOMEPAGE VIEW -------------------------//
 var IndexView = Backbone.View.extend({
    initialize: function() {
      this.render();
    },
    template: _.template($('script[data-id="homepage"]').text()),

    events: {
      'submit': 'createWebsite'
    },
    createWebsite: function(e){
        e.preventDefault();
        var FBURL = $('.fb_url').val();  
        var APIURL = "https://graph.facebook.com/?ids=" + FBURL
          //---------------------- FB API CALL ----------------------//
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
          if (pageData.location !== undefined){
          var street = pageData.location.street 
          var city = pageData.location.city 
          var country = pageData.location.country 
          var zip = pageData.location.zip 
          var latitude = pageData.location.latitude 
          var longitude = pageData.location.longitude
          }
          else {
          var street = undefined
          var city = undefined 
          var country = undefined 
          var zip = undefined 
          var latitude = undefined
          var longitude = undefined
          }
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
          // Save this site to the database
          $.ajax({
            type: "POST",
            url: "api/websites",
            data: xsiteData,
            success: function(resp){ 
              console.log ("Saved ID#" + resp.id);
              $(location).attr('href',"/#templates?id="  + resp.id);
            }
          });
        }); // end ajax call 
    },
    render: function() {
      this.$el.html(this.template);
    }
  });
 
 // ----------------------- TEMPLATES VIEW -------------------------//
 var TemplatesView = Backbone.View.extend({
    initialize: function() {
      this.render();
    },
    template: _.template($('script[data-id="templates"]').text()),
    events: {
      'click [class="templateName"]': function(e) {
        var qs = location.hash;
        var id = qs.replace("#templates?id=","");
        console.log(id)
        var templateID = e.target.attributes["data-id"].nodeValue
        // Save the template selection to the database
          $.ajax({
            type: "PATCH",
            url: "api/websites/" + id,
            data: {template_id:templateID},
            success: function(resp){ 
              console.log ("Saved ID#" + resp.id);
              $(location).attr('href',"/websites/" + resp.id);
            }
          });
      }
    },
    render: function() {
      this.$el.html(this.template);
    }
  });

//------------------------- BACKBONE ROUTES -------------------------// 
  var Router = Backbone.Router.extend({
    initialize: function() {
    },
    routes: {
      '': 'index',
      'templates': 'viewTemplates'
    },
    index: function() {
      var indexView = new IndexView({
        el: $("#main")
      });
    },
    viewTemplates: function() {
      var templatesView = new TemplatesView({
        el: $("#main")
      });
    }
  });

  window.myRouter = new Router();
  Backbone.history.start();

  
}); // end document ready