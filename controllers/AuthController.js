module.exports = {

  login: function (req, res) {
      var username = req.param('username');
      var password = req.param('password');

      verifyParams(res, username, password)
  
      User.findOne({username: username}).then(function (user) {
        if (!user) {
          return invalidUsernameOrPassword(res);
        }
        signInUser(req, res, password, user)
      }).catch(function (err) {
        return invalidUsernameOrPassword(res);
      })
      console.log(username);
    },

    logout: function(req, res){
      req.session.authenticated = false;
    //var name = req.session.User.username;
      req.session.destroy();
     // console.log('Loged out as ' + name);
      res.redirect('/');
    }
  };

  function signInUser(req, res, password, user) {
    User.comparePassword(password, user).then(
      function (valid) {
        if (!valid) {
          return this.invalidUsernameOrPassword();
        } else {                                                                                                                                                                                                                                                                                                                                                                                                                      
          var responseData = {
            user: user,
            token: generateToken(user.id)
          }
        User.createSession(req,res,user);
        return res.redirect('/notifications/list/' + user.id + user.username, responseData, user); 
        }
      }
    ).catch(function (err) { 
      return ResponseService.json(403, res, "Forbidden " + err)
    })
  };
  

  function invalidUsernameOrPassword(res){
    return ResponseService.json(401, res, "Invalid username or password")
  };


  function verifyParams(res, username, password){
    if (!username || !password) {
      return ResponseService.json(401, res, "Username and password required")
    }
  };
  
  function generateToken(user_id) {
    return JwtService.issue({id: user_id})
  };