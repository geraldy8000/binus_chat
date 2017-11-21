//Models
var Student = require('../models').Student;
var CommunityService = require('../models').CommunityService;

module.exports = {
    create(req,res,next){
        Student
            .create({
                student_id: req.body.student_id,
                password: req.body.password
            })
            .then((data) => res.send(200).send(data))
            .catch(error => res.status(400).send(error));
    },

    //list community services inside student
    list(req, res) {
        return Student
        .findAll({
            // include: [{
            //     model: CommunityService,
            //     as: 'community_service',
            // }],
        })
        .then(student => res.status(200).send(student))
        .catch(error => res.status(400).send(error));
    },
    destroy(req,res){
        return Student
            .findById(req.body.student_id)
            .then(data => {
                if (!data) {
                    return res.status(400).send({
                        message: 'Student Not Found',
                    });
                }
                data
                    .destroy()
                    .then( (data) => res.status(201).send(data))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
    return Student
        .findOne({where: {student_id: req.body.student_id}})
        .then(data => {
            if(data){
                data.updateAttributes({
                    password: req.body.password
                })
                .then( (data) => res.status(201).send(data))
            }
        })
        .catch((error) => res.status(400).send(error));
    },

    getPassword(s_id){
        return Student
            .findOne({where: {student_id:s_id},
                      raw: true,
                      attributes: ['password']})
    },
    chpass(uid, password) {
    return Student
        .findOne({where: {student_id: uid}})
        .then(data => {
            if(data){
                data.updateAttributes({
                    password: password
                })
            }
        })
    },

};