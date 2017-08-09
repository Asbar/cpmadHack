var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var mongodb = require('mongodb');
var db = mongojs('mongodb://root:123@ds161931.mlab.com:61931/cpmad_online', ['lang'])
var ObjectId = require('mongodb').ObjectID;


router.get('/personListItems', function (req, res) {

    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/cpmad_online';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("unable to connect the server");
        } else {
            var collection = db.collection('personListItems');
            collection.find({}).toArray(function (err, result) {
                if (err) {
                    res.send(err);
                } else if (result.length) {
                    res.send(result);
                }
                db.close();
            });
        }
    });
});

router.get('/feedBack', function (req, res) {

    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/cpmad_online';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("unable to connect the server");
        } else {
            var collection = db.collection('feedBack');
            collection.find({}).toArray(function (err, result) {
                if (err) {
                    res.send(err);
                } else if (result.length) {
                    res.send(result);
                }
                db.close();
            });
        }
    });
});

router.post('/personListItems', function (req, res) {

    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/cpmad_online';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("unable to connect the server");
        } else {
            var collection = db.collection('personListItems');

            var userOne = req.body;
            collection.insert(userOne, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(userOne);
                }
                db.close();
            });

        }
    });
});

router.post('/orderListItems', function (req, res) {

    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/cpmad_online';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("unable to connect the server");
        } else {
            var collection = db.collection('orderListItems');

            var userOne = req.body;
            collection.insert(userOne, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(userOne);
                }
                db.close();
            });

        }
    });
});

router.post('/feedBack', function (req, res) {

    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/cpmad_online';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("unable to connect the server");
        } else {
            var collection = db.collection('feedBack');

            var userOne = req.body;
            collection.insert(userOne, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(userOne);
                }
                db.close();
            });

        }
    });
});

router.get('/orderListItems', function (req, res) {

    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/cpmad_online';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("unable to connect the server");
        } else {
            var collection = db.collection('orderListItems');
            collection.find({}).toArray(function (err, result) {
                if (err) {
                    res.send(err);
                } else if (result.length) {
                    res.send(result);
                }
                db.close();
            });
        }
    });
});


router.get('/orderListItems/:id', function (req, res) {

    var objId = req.params.id;
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/cpmad_online';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("unable to connect the server");
        } else {

            var collection = db.collection('orderListItems');
            collection.find({"_id": ObjectId(objId)}).toArray(function (err, result) {
                if (err) {
                    res.send(err);
                } else if (result.length) {
                    res.send(result);
                }
                db.close();
            });
        }
    });
});

router.get('/ques/:title',function(req,res,next){
    db.ques.findOne({title:req.params},function(err,ques){
        if(err){
            res.send(err);
        }else{
            res.json(ques);
        }
    });
});


// Get all language details
router.get('/lang', function (req, res, next) {
    db.lang.find(function (err, lang) {
        if (err) {
            res.send(err);
        } else {
            res.json(lang);
        }
    });
});

router.delete('/lang/:time', function (req, res) {
    console.log(req.params);
    db.lang.remove({
        time: req.params.time
    }, function (err, review) {
        if (err) {
            res.send(err);
        } else {
            console.log("Ok");
        }
    });
});

module.exports = router;


