var mongoose = require('mongoose')

var userschema = mongoose.Schema({ id: Number, name: String, hometown: String, gender: String, bio: String, quote: String, color:String});
var user = mongoose.model('User', userschema);

var layoutschema = mongoose.Schema({
  backgroundcolor: String,
  font: String,
  fontsize: Number
});

layout = mongoose.model('twit', layoutschema)
exports.user = user
exports.layout = layout