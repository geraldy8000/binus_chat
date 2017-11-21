var score = require('../models').score;
var course = require('../models').course;
var takenCourse = require('../models').takenCourse;

module.exports = {
    listAll(req,res){
        return score
            .all()
            .then( (sco) => res.status(201).send(sco))
            .catch(error => res.status(400).send(error));
    },
    list(req,res){
        return score
            .findOne({where: {course_id: req.params.course_id}})
            .then( (sco) =>  res.status(200).send(sco) )
            .catch( (error) => res.status(200).send(error) );
    },
    insertNewData(req,res){

        return score
            .create({
                student_id: req.body.student_id,
                course_id: req.body.course_id
            })
            .then( (sco) => res.status(201).send(sco))
            .catch(error => res.status(400).send(error));
      
    },
    destroy(req,res){
        return score
            .findById(req.body.id)
            .then(sco => {
                if (!sco) {
                    return res.status(400).send({
                        message: 'Course Taken Not Found',
                    });
                }
                sco
                    .destroy()
                    .then( (sco) => res.status(201).send(sco))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    getScore(uid){
        return score
            .findAll({where: {student_id:uid},
                        raw: true,
                        order: '"course_id" ASC'})
    },
    update(req, res) {
    return score
        .findOne({where: {id: req.body.id}})
        .then(sco => {
            if(sco){
                sco.updateAttributes({
                    grades: req.body.grades
                })
                .then( (sco) => res.status(201).send(sco))
            }
        })
        .catch((error) => res.status(400).send(error));
    },
    checkStudent(co_id,uid){
        return score
            .findOne({
                where: {
                    course_id: co_id,
                    student_id:uid
                }
            })
    },
};
