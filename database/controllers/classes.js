var classes = require('../models').classes;

module.exports = {
    listAll(req,res){
        return classes
            .all()
            .then( (cl) => res.status(201).send(cl))
            .catch(error => res.status(400).send(error));
    },
    list(req,res){
        return classes
            .findOne({where: {course_id: req.params.course_id}})
            .then( (cl) =>  res.status(200).send(cl) )
            .catch( (error) => res.status(200).send(error) );
    },
    insertNewData(req,res){
        return classes
            .findOne({
                where: {
                    course_id: req.body.course_id,
                    class_id: req.body.class_id
                }
            })
            .then((cl) => {
                if(cl) {
                    return res.status(404).send({
                        message: 'Class has been inputted',
                    });
                }
                return classes
                    .create({
                        course_id: req.body.course_id,
                        class_id: req.body.class_id,
                        day: req.body.day,
                        time: req.body.time,
                        scu: req.body.scu
                    })
                    .then( (cl) => res.status(201).send(cl))
                    .catch(error => res.status(400).send(error));
            })
        
    },
    update(req, res) {
    return classes
        .findOne({where: {id: req.body.id}})
        .then(cl => {
            if(cl){
                cl.updateAttributes({
                    time: req.body.time
                })
                .then( (cl) => res.status(201).send(cl))
            }
        })
        .catch((error) => res.status(400).send(error));
    },
    getDetails(co_id,cl_id)
    {
        return classes
            .findAll({
                where: {
                    course_id: co_id,
                    class_id: cl_id
                }
            })
    }
};
