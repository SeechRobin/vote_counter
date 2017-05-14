// UserController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var Poll = require('./Poll');
var User = require('../user/User');
var Candidate = require('../candidate/Candidate');


// CREATES A NEW POLL/VOTE
router.post('/', function (req, res) {

    User.findById(req.body.user, function (err, user) {
        console.log("User votes " + user);
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        if(user.votes <3) {

             limit = 3 - user.votes; // NOT to exceed 3 votes

             if(req.body.votes>limit) {
                res.status(403).send('Number of votes exceeded');
             }
             else{
                Poll.create({
                    user : req.body.user,
                    candidate : req.body.candidate,
                    votes : req.body.votes
                }, 
                function (err, poll) {
                    if (err) return res.status(500).send("There was a problem adding the information to the database.");

                    //Get current vote count
                    Candidate.findById(req.body.candidate, function (err, candidate) {
                        if (err) return res.status(500).send("There was a problem finding the candidate.");
                        if (!candidate) return res.status(404).send("No candidate found.");

                        currentVotes = parseInt(candidate.votes) + parseInt(req.body.votes);
                   
                        //Update Candidate votes
                        Candidate.findByIdAndUpdate(req.body.candidate,  { votes: currentVotes }, function (err, candidate) {
                            if (err) return res.status(500).send("There was a problem updating the candidate.");
                            res.status(200).send("Updated Votes");
                        });

                        currentVotes = 0;
                        currentVotes = parseInt(user.votes) + parseInt(req.body.votes);

                        //Update User/Voter Numbers
                        User.findByIdAndUpdate(req.body.user,  { votes: currentVotes }, function (err, user) {
                            if (err) return res.status(500).send("There was a problem updating the user.");
                        });
                    });
                    // res.status(200).send(poll);
                });
            }            
        }else {
                res.status(403).send('Number of votes exceeded');

        }       
    });
    
});


// GETS A SINGLE POLL FROM THE DATABASE
router.get('/:id', function (req, res) {
    Poll.findById(req.params.id, function (err, poll) {
        if (err) return res.status(500).send("There was a problem finding the candidate.");
        if (!poll) return res.status(404).send("No candidate found.");
        res.status(200).send(poll);
    });
});


// RETURNS ALL THE POLLS IN THE DATABASE
router.get('/', function (req, res) {
    Poll.find({}, function (err, poll) {
        if (err) return res.status(500).send("There was a problem finding the candidate.");
        res.status(200).send(poll);
    });
});


// DELETES A POll FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Poll.findByIdAndRemove(req.params.id, function (err, poll) {
        if (err) return res.status(500).send("There was a problem deleting the candidate.");
        res.status(200).send("Candidate "+ poll.name +" was deleted.");
    });
});

// UPDATES A SINGLE POLL IN THE DATABASE
router.put('/:id', function (req, res) {
    
    Poll.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err,poll) {
        if (err) return res.status(500).send("There was a problem updating the candidate.");
        res.status(200).send(poll);
    });
});

module.exports = router;