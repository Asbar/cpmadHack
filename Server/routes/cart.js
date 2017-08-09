var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

router.get('/cart', function (req, res) {

    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/cpmad_online';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("unable to connect the server");
        } else {
            var collection = db.collection('cart');
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


router.post('/cart', function (req, res) {

    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/cpmad_online';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("unable to connect the server");
        } else {
            var collection = db.collection('cart');
            var cartDetail = req.body;

            collection.insert(cartDetail, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(result);
                }
                db.close();
            });

        }
    });
});

router.post('/cartUpdate', function (req, res) {

    var item = {
        cartId:req.body[0].cartId,
        foodName: req.body[0].foodName,
        foodImage: req.body[0].foodImage,
        size: req.body[0].size,
        color: req.body[0].color,
        quantity: req.body[0].quantity,
        TempOldPrice: req.body[0].TempOldPrice,
        TempNewPrice: req.body[0].TempNewPrice
    }

    var id = req.body[0].id;

    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/cpmad_online';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("unable to connect the server");
        } else {
            var collection = db.collection('cart');

            var cartDetail = req.body;

            collection.updateOne({"_id":ObjectId(id)},{$set:item}, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(result);
                }
                db.close();
            });

        }
    });
});


router.delete('/cartDelete/:id', function (req, res) {

    var id = req.params.id;
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/cpmad_online';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("unable to connect the server");
        } else {
            var collection = db.collection('cart');

            collection.remove({"_id":ObjectId(id)}, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(result);
                }
                db.close();
            });

        }
    });
});

module.exports = router;
