var takenCourse = require('../models').takenCourse;
//var course = require('../course').course;
var classes = require('../models').classes;

module.exports = {
    listAll(req,res){
        return takenCourse
            .all()
            .then( (co) => res.status(201).send(co))
            .catch(error => res.status(400).send(error));
    },
    list(req,res){
        return takenCourse
            .findOne({where: {course_id: req.params.course_id}})
            .then( (co) =>  res.status(200).send(co) )
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
            .then(cl => {
                if(!cl) {
                    return res.status(404).send({
                        message: 'Class Not Found',
                    });
                }
                return takenCourse
                    .create({
                        student_id: req.body.student_id,
                        course_id: req.body.course_id,
                        class_id: req.body.class_id
                    })
                    .then( (co) => res.status(201).send(co))
                    .catch(error => res.status(400).send(error));
                        
            })   
            .catch(error => res.status(400).send(error));       
    },
    getSchedule(){
        return takenCourse
            .findAll({where: {student_id:1701319823},
                      raw: true})
    },
    checkStudent(co_id){
        return takenCourse
            .findOne({
                where: {
                    course_id: co_id,
                    student_id:1701319823
                }
            })
    }
};
