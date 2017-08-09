var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://root:123@ds161931.mlab.com:61931/cpmad_online',['profile'])

// Get all users
router.get('/profile',function(req,res,next){
    db.profile.find(function(err,user){
        if(err){
            res.send(err);
        }else{
            res.json(user);
        }
    });
});

router.post('/profile',function(req,res,next){

    var userOne = req.body;
    db.profile.save(userOne,function(err,userOne){
        if(err){
            res.send(err);
        }else{
            res.json(userOne);
        }
    });
});

module.exports =router;
