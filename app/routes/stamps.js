var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var database = require('./../database');
var models = database;

var urlencode = bodyParser.urlencoded({ extended: false});

var router = express.Router();

router.route('/')
	//Return all stamps
	.get(function(req, res){
		models.Stamp
			.find()
			.sort({'date': -1})
			.limit(5)
			.exec(function (err, stamps){
				if (err) throw error;
				res.json(stamps);
		});
	})
	//Add stamp
	.post(urlencode, function(req, res){
		//Add anon stamp if no details provided
		if (!req.body.user){
			var stamp = new models.Stamp();
			stamp.save(function (err, stamp){
				if (err) throw error;
				res.status(201).json(stamp.user);
			});
		//Add stamp with details
		} else {
			var stamp = new models.Stamp({user: req.body.user, location: req.body.location});
			stamp.save(function (err, stamp){
				if (err) throw error;
				res.status(201).json(stamp.user);
			});
		}
	});

module.exports = router;