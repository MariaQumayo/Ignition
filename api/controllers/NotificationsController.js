

 module.exports = {
    //view all notifications
    list:function (req, res){
        Notifications.find({
            status: ['issue', 'intermittent', 'general']
        }).exec(function(err,notifications){
            if(err){
               console.log("in list function"); 
               res.send(500, {error:'Database error'});
            }
               res.view('list', {notifications: notifications});
       });
    },

//resolved
    resolved:function (req, res){
        Notifications.find({
            status: 'resolved'
        }).exec(function(err,notifications){
            if(err){
                console.log("in resolved function"); 
                res.send(500, {error:'Database error'});
            }
                res.view('resolved', {notifications: notifications});
        });
    },

//add page
    add: function(req, res){
        res.view('add');
    },

//create
    post: function(req,res){
   
    var title = req.body.title;
    var body = req.body.body;
    var status = req.body.status;
  
     
        Notifications.create({title:title, body:body, status:status}).exec(function(err){
                if(err){
                    res.send(500, {error:err});
                }else{
           res.redirect('/notifications/list');  
        }
    });
},

//edit
    edit: function(req, res){
        Notifications.findOne({id:req.params.id}).exec(function(err, notification){
            if(err){
                res.send(500, {error: 'Database Error'});
            }else{
                res.view('edit',{notification:notification});
            }
        });
    }, 

//update
update: function(req,res){
   
    var title = req.body.title;
    var body = req.body.body;
    var status = req.body.status;
  
     
        Notifications.update({id:req.params.id}, {title:title, body:body, status:status}).exec(function(err){
                if(err){
                console.log('im here');
                    res.send(500, {error:err});
                }else{
           res.redirect('/notifications/list');  
        }
        return false;
    });
},

//delete notification
delete: function(req, res){
       if(this.id == req.params.id){
           
       }
        Notifications.destroy({id:req.params.id}).exec(function (error){
           // console.log('Im in delete again');
            if(error){
                res.send(500, {error:'Database error'});
            }
             res.redirect('/notifications/list');
        });
        return false;
    }
};    