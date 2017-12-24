var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test'; //test is the name of the database we want use
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index'); 
});

router.get('/get-data', function(req, res, next){
	var resultArray = [];
	mongo.connect(url, function(err, db) {
		assert.equal(null, err);
		var cursor = db.collection('data').find();
		cursor.forEach(function(doc, err) {
			assert.equal(null, err);
			resultArray.push(doc);
		}, function(){
			db.close();
			res.render('index', {items: resultArray});
		});
	});
});

router.post('/insert', function(req, res, next){
	var item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	};

	mongo.connect(url, function(err, db){
		assert.equal(null, err);
		db.collection('data').insertOne(item, function(err, result){
			assert.equal(null, err);
			console.log('Item inserted');
			db.close();
		});
	});

	res.redirect('/');
});

router.post('/update', function(req, res, next){
	var item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	};
	var id = req.body.id;


	mongo.connect(url, function(err, db){
		assert.equal(null, err);
		db.collection('data').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result){
			assert.equal(null, err);
			console.log('Item updated');
			db.close();
		});
	});

});

router.post('/delete', function(req, res, next){
	var item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	};
	var id = req.body.id;


	mongo.connect(url, function(err, db){
		assert.equal(null, err);
		db.collection('user-data').deletOne({"_id": objectId(id)}, function(err, result){
			assert.equal(null, err);
			console.log('Item deleted');
			db.close();
		});
	});
});


module.exports = router;
