const t1 = require('../models/note.model.js');
const mongoose = require('mongoose');
var request = require('request');
exports.create = (req, res) => {
    console.log(req.body, 'hello');
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        acccount_holder_name: req.body.acccount_holder_name || "Untitled Note", 
        account_no: req.body.account_no
    });

    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};
exports.findAll = (req, res) => {
    var Schema = mongoose.Schema; 
    var User = mongoose.model("User", new Schema(), "rest_api");
    User.find({}, function(err, doc){ res.send(doc) })
};
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};
exports.vinayakdetails= (req, res)=>{
    request.get({
        url: 'https://cricket.sportmonks.com/api/v2.0/continents?api_token=c6l1OsfWKOMtG25Ubt5xj5xa4MwHMMlTU3cwm9iJueSbWYgeYWSmTwn4W3gW',
        headers: {
            "Content-Type":"application/json",
            'Accept': 'application/json',
        },
 
        }, function (error, response, body) {
            if (error) {
                console.log(error);
            }
          res.append('Access-Control-Allow-Origin', '*'); 
          res.append('Access-Control-Allow-Origin', 'http://localhost:4200');      
          res.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
           return res.send(body);
        })
    }