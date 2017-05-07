var satEvent = require('../models').satEvent;
var sequelize = require('sequelize');

module.exports = {
    
    insertNewEvent(req,res){
        return satEvent
            .create({
                name: req.body.name,
                organization: req.body.organization,
                event_date: req.body.event_date                
            })
            .then( (sa) => res.status(201).send(sa))
            .catch(error => res.status(400).send(error));
    },

    getAllEvent(req,res){
        return satEvent
            .all()
            .then( (sa) => res.status(200).send(sa))
            .catch(error => res.status(400).send(error));
    },

    getAllEvents(){
        return satEvent
            .findAll({raw: true})
    }
};
