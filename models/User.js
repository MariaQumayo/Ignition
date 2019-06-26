/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require("bcrypt")
var Promise = require("bluebird")
//var jwt = require('jsonwebtoken');

module.exports = {

  attributes: {
        username: {
          type: "string",
          required: true,
        },
        password:{
          type: "string",
          minLength: 6,
          protected: true,
          required: true,
         columnName: "encryptedPassword"
        }
    },

       // overide function that turns model into a json object response, and replace password 
        toJSON: function(){
          var obj = this.toObject()
          delete obj.password //delete password, so it does not show up in response
        },
      //create a hash for the password and replace the hash with the password
      beforeCreate: async function(values, cb){
        var numberofUsers = await User.count();
        if(numberofUsers == 0){
        bcrypt.hash(values.password, 10, function (err, hash) {
          if (err) {
          console.log('bcrypt error: ' + error); 
          return cb(err)
          };
          values.password = hash; //has password
          cb();
        });
      }else{
       console.log('max users');
      return cb("error")
      }
    },

  comparePassword: function (password, user) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, user.password, function (err, match) {
        if (err) reject(err);
        if (match) {
          resolve(true);
        } else {
          reject(err);
        }
      })
    });
  },

  createSession:function(req,res, user){
    if (user){
      req.session.User = user;
      req.session.authenticated = true;
      console.log(req.session);
      console.log('the user ', User);
     }else{
       console.log('error loging in: ', err)
     }
  }
};
