$(function() {
console.log("scripts.js linked");

//------------------------- BACKBONE MODELS -------------------------//

var Website = new Backbone.Model.extend({
  url:"/api/websites"
});

var Websites = new Backbone.Collection.extend({
  urlRoot:"/api/websites",
  model: Website
});

//------------------------- BACKBONE VIEWS -------------------------// 
 
 // ----------------------- HOMEPAGE VIEW -------------------------//
 var IndexView = Backbone.View.extend({
    initialize: function() {
      this.render();
      // $('body').stye
    },
    template: _.template($('script[data-id="homepage"]').text()),

    events: {
      'submit': 'createWebsite'
    },
    createWebsite: function(e){
        e.preventDefault();
        var FBURL = $('.fb_url').val();  
        var APIURL = "https://graph.facebook.com/?ids=" + FBURL;
          //---------------------- FB API CALL ----------------------//
          $.getJSON( APIURL, function( data ) {
          var pageName = Object.keys(data)[0]; // returns first key
          var pageData = data[pageName]; // object with data that we are interested in
          console.log(pageData);
          var fb_id = pageData.id;
          var template_id = 1;
          var logo = "https://graph.facebook.com/" + fb_id + "/picture?url";
          if (pageData.cover !== undefined){
            var cover_photo = pageData.cover.source;
          }
          else {
            var cover_photo = "http://lorempixel.com/output/city-q-c-1920-547-3.jpg";
          }
          var name = pageData.name;
          var email = pageData.email; // this may require a page token
          var about = pageData.about;
          var company_overview = pageData.company_overview;
          var description = pageData.description;
          var mission = pageData.mission;
          var founded = pageData.founded;
          var category = pageData.category;
          var facebook_url = pageData.link;
          var phone = pageData.phone;
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
          var hours = pageData.hours;

          var xsiteData = {
            fb_id: fb_id,
            template_id: template_id,
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
          };

          // Save this site to the database
          $.ajax({
            type: "POST",
            url: "api/websites",
            data: xsiteData,
            success: function(resp){ 
              console.log ("Saved ID#" + resp.id);
              var siteID = resp.id
              /* make an API call to get photos for a site */
              getCoverPhotos(fb_id, siteID);
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
      $('body').css('background','none')
      var id = location.hash.replace("#templates?id=","");
      $('#siteloader').load("/websites/" + id);
      var preview = $("<a href='/websites/" + id + "' class='button-xlarge pure-button pure-button-primary'>View my Site!</a>");
          preview.prependTo("#logins");
      //$('#siteloader').innerHTML = "<iframe src='/websites/" + id + "' width='500' height='300' frameborder='0'>"
      getSite(id);
    },
    template: _.template($('script[data-id="templates"]').text()),
    events: {
      'click [class="templateName"]': function(e) {
        var id = location.hash.replace("#templates?id=","");
        var templateID = e.target.attributes["data-id"].nodeValue;
        console.log("template ID " + templateID)
        // Save the template selection to the database
          $.ajax({
            type: "PATCH",
            url: "api/websites/" + id,
            data: {template_id: templateID},
            success: function(resp){ 
              console.log ("Saved ID# " + resp.id);
              // Preview the template in the preview div
              $('#siteloader').load("/websites/" + resp.id);
              //$('#siteloader').innerHTML = "<iframe src='/websites/" + resp.id + "' width='500' height='300' frameborder='0'>"
            }
          });
      },
      'blur [id="contact-name"]': function(e){
        var id = location.hash.replace("#templates?id=","");
        var name = $('#contact-name').val();
        var data = {contact_name: name};
        updateSite (data,id);
      },
      'blur [id="email"]': function(e){
        var id = location.hash.replace("#templates?id=","");
        var email = $('#email').val();
        var data = {email: email};
        updateSite (data,id);
      },
      'blur [id="twitter"]': function(e){
        var id = location.hash.replace("#templates?id=","");
        var twitter = $('#twitter').val();
        var data = {twitter_url: twitter};
        updateSite (data,id);
      },
      'blur [id="domain"]': function(e){
        var id = location.hash.replace("#templates?id=","");
        var domain = $('#domain').val();
        var data = {domain: domain};
        updateSite (data, id);
      },
      'blur [id="html-title"]': function(e){
        var id = location.hash.replace("#templates?id=","");
        var htmlTitle = $('#html-title').val();
        updateSite ({html_title: htmlTitle}, id);
      },
      'click [id=""]': function(e){
        var id = location.hash.replace("#templates?id=","");
        var htmlTitle = $('#html-title').val();
        updateSite ({html_title: htmlTitle}, id);
      }
    },
    render: function() {
      this.$el.html(this.template);
    }
  });

//------------------------- BACKBONE ROUTES -------------------------// 
  var Router = Backbone.Router.extend({
    initialize: function(currentUser) {
      this.currentUser = currentUser;
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

  // $.getJSON('/sessions').done(function(user) {
  //     window.myRouter = new Router(new User(user));
  //     Backbone.history.start();
  // });

 window.myRouter = new Router();
 Backbone.history.start();


  
}); // end document ready

//------------------------- USEFUL FUNCTIONS -------------------------// 
  
/* make the API call to get photos for a site */
function getCoverPhotos(pageid, id){

  FB.api('/' + pageid + '/albums?fields=id,name', function(response) {
    for (var i=0; i<response.data.length; i++) {
      var album = response.data[i];
      
      if (album.name == 'Cover Photos'){

        FB.api('/'+album.id+'/photos', function(photos){
          if (photos && photos.data && photos.data.length){
            for (var j=0; j<photos.data.length; j++){
              var photo = photos.data[j];
              console.log(photo)
              var object = {
                    fb_photo_id: photo.id,
                    source: photo.source,
                    website_id: id
                  }

              $.ajax({
                type: "POST",
                url: "api/websites/" + id + "/photos",
                data: object,
                success: function(resp){ 
                console.log ("Saved photo ID#" + resp.id);
                }
              }); // end ajax call 
            }
          }
        });

        break;
      }
    }
  });
}


function saveSite (object){
  $.ajax({
          type: "POST",
          url: "api/websites",
          data: object,
            success: function(resp){ 
              console.log ("Saved ID#" + resp.id);
            }
        }); // end ajax call 
}

function updateSite (object, id){
  $.ajax({
          type: "PATCH",
          url: "api/websites/" + id,
          data: object,
            success: function(resp){ 
              console.log ("Updated Site ID#" + resp.id);
            }
          });// end ajax call 
} 

function getSite (id){
  $.ajax({
          type: "GET",
          url: "api/websites/" + id,
            success: function(site){ 
              $('#contact-name').val(site.contact_name);
              $('#email').val(site.email);
              $('#domain').val(site.domain);
              $('#twitter').val(site.twitter_url);
              $('#html-title').val(site.html_title);
            }
          });// end ajax call 
  } 