var express = require('express'),
  app = express();

//app.configure(function(){
//  app.use(express.static(__dirname + '/static'));
//});

app.get('/', function(req, res){
  res.sendfile('example.html');
});

app.get('/photos', function(req, res){
  res.sendfile('photos-test.html');
});

app.listen(3000);