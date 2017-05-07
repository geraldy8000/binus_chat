var sat = require('../models').sat;
var satEvent = require('../models').satEvent;


module.exports = {
    listAll(req,res){
        return sat
            .all()
            .then( (sa) => res.status(200).send(sa))
            .catch(error => res.status(400).send(error));
    },
    list(req,res){
        return sat
            .all(
                {where: {student_id: req.params.student_id},
                attributes: ['id', 'points']})
            .then( (sa) =>  res.status(200).send(sa) )
            .catch( (error) => res.status(200).send(error) );
    },
    getTotalPoints(req,res){
        var total_points;
        var list = [];

        sat
            .sum('points', {where: {student_id: req.params.student_id}})
            .then(total => 
                {
                    total_points = total;
                })
            .catch((error) => res.status(400).send(error));  

        sat
            .findAll({  where: {student_id: req.params.student_id},
                        raw:true,
                        attributes: ['id', 'title', 'organization', 'level', 'points']})
            .then(function(sat){
                for(var key in sat)
                {
                    if(sat.hasOwnProperty(key))
                    {
                        list.push({
                            id: sat[key].id,
                            title: sat[key].title,
                            organization: sat[key].organization,
                            level: sat[key].level,
                            points: sat[key].points,
                        });
                    }
                }

                var final_object = {};
                final_object.student_id = req.params.student_id;
                final_object.list = list;
                final_object.total_points = total_points;
                res.status(200).send(final_object);
            })
            .catch((error) => res.status(400).send(error));
    },
    getReqPoints(req,res){
        var goal = 120;
        return sat
            .sum('points', {where: {student_id: req.params.student_id}})
            .then(total => 
                {
                    need = goal - total;
                    res.status(200).send(need.toString())
                })
            .catch((error) => res.status(400).send(error));  
    },
    insertNewData(req,res){
        return sat
            .create({
                student_id: req.params.student_id,
                title: req.body.title,
                organization: req.body.organization,
                level: req.body.level,
                points: req.body.points
            })
            .then( (sa) => res.status(201).send(sa))
            .catch(error => res.status(400).send(error));
    },
    destroy(req,res){
        return sat
            .findById(req.params.id)
            .then(sat => {
                if (!sat) {
                    return res.status(400).send({
                        message: 'sat Not Found',
                    });
                }
                return sat
                    .destroy()
                    .then( (sa) => res.status(201).send(sa))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

     /* -------------------------------------------------------------------------------------
    *                             RETURN QUERY FROM MODEL 
    * ------------------------------------------------------------------------------------- */

    getTotalSatPoints(){
        return sat
            .sum('points', {where:{student_id:1701319823}})
    },

    getSatDetails(){
        return sat
            .findAll({where: {student_id:1701319823},
                      raw: true,
                      attributes: ['title','organization','level','points']})
    },


    insertNewEvent(req,res){
        return satEvent
            .create({
                name: req.body.name,
                organization: req.body.organization,
                event_date: req.body.event_date                
            })
            .then( (sa) => res.status(201).send(sa))
            .catch(error => res.status(400).send(error));
    }
};
