var CommunityService = require('../models').CommunityService;

module.exports = {

    /* -------------------------------------------------------------------------------------
    *                             RETURN HTTP RESPONSE OBJECT
    * ------------------------------------------------------------------------------------- */

    initNewStudent(req,res){
        return CommunityService
            .create({
                student_id: req.body.student_id,
            })
            .then( (com) => res.status(201).send(com))
            .catch(error => res.status(400).send(error));
    },
    getDetails(req,res){
        return CommunityService
            .findAll({where: {student_id: req.params.student_id}})
            .then((com) => res.status(201).send(com))
            .catch((error) => res.status(200).send(error));
    },
    insertNewData(req,res){
        return CommunityService
            .create({
                student_id: req.params.student_id,
                period: req.body.period,
                activity_name: req.body.activity_name,
                project_name: req.body.project_name,
                hours: req.body.hours,
            })
            .then((com) => res.status(201).send(com))
            .catch(error => res.status(400).send(error));
    },
    getTotalActivityAndHour(req,res){
        var total_hour;
        var activity = [];

        //Total hour
        CommunityService
            .sum('hours', {where: {student_id: req.params.student_id}})
            .then(function(com){
                total_hour = com;
            })
            .catch((error) => res.status(400).send(error));
        
        //Retrieve activity and project name
        CommunityService
            .findAll({where: {student_id: req.params.student_id},
                      raw: true,
                      attributes: ['id','activity_name','project_name','hours']})
            .then(function(com){
                //Iterate through array[json]
                for (var key in com)
                {
                    if (com.hasOwnProperty(key))
                    {
                        activity.push({
                            id: com[key].id,
                            activity_name: com[key].activity_name,
                            project_name: com[key].project_name,
                            hours: com[key].hours,
                        });
                    }
                }

                var final_object = {};
                final_object.student_id = req.params.student_id;
                final_object.activity = activity;
                final_object.total_hour = total_hour;
                
                res.status(200).send(final_object);
            })
            .catch((error) => res.status(400).send(error));
    },

    /* -------------------------------------------------------------------------------------
    *                             RETURN QUERY FROM MODEL 
    * ------------------------------------------------------------------------------------- */

    getTotalCommunityServiceHour(){
        return CommunityService
            .sum('hours', {where:{student_id:1701319823}})
    },

    getFinishedActivity(){
        return CommunityService
            .findAll({where: {student_id:1701319823},
                      raw: true,
                      attributes: ['id','activity_name','project_name','hours']})
    }
};
