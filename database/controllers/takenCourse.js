var takenCourse = require('../models').takenCourse;
//var course = require('../course').course;
var classes = require('../models').classes;
var score = require('../models').score;

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
                    .findOne({
                        where: {
                            student_id: req.body.student_id,
                            course_id: req.body.course_id,
                        }
                    })
                    .then((co) => {
                        if(co) {
                            return res.status(404).send({
                                message: 'Course has been taken',
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
                        
            })   
            .catch(error => res.status(400).send(error));       
    },
    destroy(req,res){
        return takenCourse
            .findById(req.body.id)
            .then(co => {
                if (!co) {
                    return res.status(400).send({
                        message: 'Course Taken Not Found',
                    });
                }
                co
                    .destroy()
                    .then( (co) => res.status(201).send(co))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    getSchedule(uid){
        return takenCourse
            .findAll({where: {student_id:uid},
                        raw: true,
                        order: '"course_id" ASC'})
    },
    checkStudent(co_id,uid){
        return takenCourse
            .findOne({
                where: {
                    course_id: co_id,
                    student_id:uid
                }
            })
    },
    
};
