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
    var ID;

    
    req.facebook.api('/me', function(err, user) {
        
        Name = user.name; 
        Hometown = user.hometown.name;
        Gender = user.gender;
        Bio = user.bio;
        Quote = user.quotes;
        ID = user.id;
        req.facebook.api('/me/picture?redirect=false&type=large', function(err, data) {
            Picture = data.data.url
            
            req.facebook.api('/me/friends', function(err, friends) {
                var newId1 = friends.data[101].id;
                req.facebook.api('/'+newId1+'?fields=picture.type(large),photos.type(large).limit(50).fields(id,picture)', function(err, friend1) {
                    Imgs =friend1.photos.data
                    User.find({id: ID}).exec(function(err, addeduser){
                    if (addeduser.length == 0){
                        var newuser = new User({id: ID, name: Name, hometown: Hometown, gender: Gender, bio: Bio, quote: Quote, color: "#FFFFFF" });
                        newuser.save(function(){});
                        res.render("mainpage", {imgs: Imgs, title: "MyPlace", user: Name, picture: Picture, hometown: Hometown, gender: Gender, bio: Bio, quote: Quote, color: "#FFFFFF"})
                    }
                    else{
                        res.render("mainpage", {imgs: Imgs,title: "MyPlace", user: Name, picture: Picture, hometown: Hometown, gender: Gender, bio: Bio, quote: Quote, color: addeduser[0].color })

                        }                              
                                                  
                    })     
                })
            }); 
            
        });
    });
    
}


exports.addColor = function (req, res){
        User.find({id: req.session.user_id}).exec(function(err, olduser){
            olduser[0].color = req.body.input
            olduser[0].save() 
        })

}


exports.addComment = function (req, res){
    req.facebook.api('/' + req.body.id+ '/comments', 'post', {message: req.body.comment}, function(err, data){
        res.send(err);
    });       
}