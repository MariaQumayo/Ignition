module.exports = function (req, res, next) {
  
    if(req.session.authenticated){
     console.log('loged in as ' + req.session.User.username);
     next();
    }else{
      console.log('failed');
      return res.redirect('/');
    }
  }