var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var mongodb = require('mongodb');
var db = mongojs('mongodb://root:123@ds161931.mlab.com:61931/cpmad_online',['user'])


router.get('/user', function (req, res) {

    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/cpmad_online';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("unable to connect the server");
        } else {

            var collection = db.collection('user');
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


router.post('/user', function (req, res) {

    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/cpmad_online';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("unable to connect the server");
        } else {

            var collection = db.collection('user');

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

module.exports = router;
