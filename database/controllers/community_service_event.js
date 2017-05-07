var CommunityServiceEvent = require('../models').CommunityServiceEvent;

module.exports = {

    /* -------------------------------------------------------------------------------------
    *                             RETURN HTTP RESPONSE OBJECT
    * ------------------------------------------------------------------------------------- */

    insertNewEvent(req,res){
        return CommunityServiceEvent
            .create({
                activity_name: req.body.activity_name,
                project_name: req.body.project_name,
                hours: req.body.hours,
            })
            .then((data) => res.status(200).send(data))
            .catch((error) => res.status(400).send(error));
    },

    /* -------------------------------------------------------------------------------------
    *                             RETURN QUERY FROM MODEL 
    * ------------------------------------------------------------------------------------- */

    getEvents(req,res){
        return CommunityServiceEvent
            .findAll({raw:true});
    }
}