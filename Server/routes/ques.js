var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://root:123@ds161931.mlab.com:61931/cpmad_online',['ques'])


// Get questions by specific language
router.get('/ques/:title',function(req,res,next){
    db.ques.findOne({title:req.params},function(err,ques){
        if(err){
            res.send(err);
        }else{
            res.json(ques);
        }
    });
});

// Get all questions
router.get('/ques',function(req,res,next){
    //console.log(db.req.params);
    db.ques.find(function(err,ques){
        if(err){
            res.send(err);
        }else{
            res.json(ques);
        }
    });
});



module.exports =router;
