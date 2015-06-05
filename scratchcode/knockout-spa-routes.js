//------------------------- KNOCKOUT JS -------------------------//  

// create a new viewmodel for SPA templates
var vm = function(defaultPage) {
// set current template to default page
  this.Page = ko.observable(defaultPage);

// function to show homepage
  this.GoToHomepage = function(){
    this.Page("Homepage");
  }

// function to show templates selection
  this.GoToTemplates = function(){
    this.Page("Templates");
  }
};

// Intilialize and pass along default page
ko.applyBindings(new vm("Homepage"));