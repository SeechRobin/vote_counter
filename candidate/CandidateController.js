// UserController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var Candidate = require('./Candidate');

// CREATES A NEW CANDIDATE
router.post('/', function (req, res) {
    Candidate.create({
            name : req.body.name,
            votes : req.body.votes,
        }, 
        function (err, candidate) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(201).send(candidate);
        });
});


// GETS A SINGLE CANDIDATE FROM THE DATABASE
router.get('/:id', function (req, res) {
    Candidate.findById(req.params.id, function (err, candidate) {
        if (err) return res.status(500).send("There was a problem finding the candidate.");
        if (!candidate) return res.status(404).send("No candidate found.");
        res.status(200).send(candidate);
    });
});


// RETURNS ALL THE CANDIDATEs IN THE DATABASE WITH THIER VOTE RESULTS
router.get('/', function (req, res) {
    Candidate.find({}, function (err, candidate) {
        if (err) return res.status(500).send("There was a problem finding the candidate.");
        res.status(200).send(candidate);
    });
});


// DELETES A CANDIDATE FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Candidate.findByIdAndRemove(req.params.id, function (err, candidate) {
        if (err) return res.status(500).send("There was a problem deleting the candidate.");
        res.status(200).send("Candidate "+ candidate.name +" was deleted.");
    });
});

// UPDATES A SINGLE CANDIDATE IN THE DATABASE
router.put('/:id', function (req, res) {
    
    Candidate.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, candidate) {
        if (err) return res.status(500).send("There was a problem updating the candidate.");
        res.status(200).send(candidate);
    });
});

module.exports = router;