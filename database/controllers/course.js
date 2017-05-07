var course = require('../models').course;

module.exports = {
    listAll(req,res){
        return course
            .all()
            .then( (co) => res.status(201).send(co))
            .catch(error => res.status(400).send(error));
    },
    list(req,res){
        return course
            .findOne({where: {course_id: req.params.course_id}})
            .then( (co) =>  res.status(200).send(co) )
            .catch( (error) => res.status(200).send(error) );
    },
    create(req,res){
        return course
            .create({
                course_id: req.body.course_id,
                course_name: req.body.course_name
            })
            .then( (co) => res.status(201).send(co))
            .catch(error => res.status(400).send(error));
    },
    getCourseDetails(id){
        return course
            .findOne({where: {course_id: id}})
    },
    getCourse(name){
        return course
            .findOne({where: {course_name : name}})
    }
};
