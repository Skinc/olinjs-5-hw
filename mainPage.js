exports.makePage(req, res) {
  req.facebook.api('/me', function(err, user) {
    console.log("user", user)
      res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, ' + user.name + '!');
  });

}