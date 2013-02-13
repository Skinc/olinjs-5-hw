var model = require('../model.js') 
var User = model.user;
var layout = model.layout ;


exports.makePage = function(req, res) {
    var Name;
    var Hometown;
    var Gender;
    var Bio;
    var Quote;
    var Picture;

    
    req.facebook.api('/me', function(err, user) {
        
        console.log("user", user)
        Name = user.name; 
        Hometown = user.hometown.name;
        Gender = user.gender;
        Bio = user.bio;
        Quote = user.quotes;
       
        req.facebook.api('/me/picture?redirect=false&type=large', function(err, data) {
            Picture = data.data.url
            res.render("mainpage", {title: "MyPlace", user: Name, picture: Picture, hometown: Hometown, gender: Gender, bio: Bio, quote: Quote})
            var newuser = new User({id: 7, name: Name, hometown: Hometown, gender: Gender, bio: Bio, quote: Quote });
            newuser.save(function(){}); 

        });
    });
    
}


exports.getUser = function facebookGetUser() {
  return function(req, res, next) {
    req.facebook.getUser( function(err, user) {
        console.log("user",user)
      if (!user || err){
        res.send("you need to login");
      } else {
        req.user = user;
        next();
      }
    });
  }
}
