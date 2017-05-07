var express = require('express');
var router = express.Router();

var models = require("../database/models");

var studentController = require('../database/controllers').student;
var comServiceController = require('../database/controllers').communityService;
var comServiceEventController = require('../database/controllers').communityServiceEvent;
var satController = require('../database/controllers').sat;
var satEventController = require('../database/controllers').satEvent;
var financialController = require('../database/controllers').financial;
var financialAccController = require('../database/controllers').financialAccount;
var courseAccController = require('../database/controllers').course;
var takenCourseAccController = require('../database/controllers').takenCourse;
var classesController = require('../database/controllers').classes;

/* GET home page. */

router.get('/community', function(req, res, next) {
  res.render('cms_bodies/community_services/community_services');
});



router.get('/api/student', studentController.list);
router.post('/api/student', studentController.create);

//Comm Service Routes
router.get('/api/com/:student_id', comServiceController.getDetails);
router.get('/api/com/:student_id/hours', comServiceController.getTotalActivityAndHour);
router.post('/api/com/:student_id', comServiceController.insertNewData)

//Comm Service Event Routes
router.post('/api/com_event/', comServiceEventController.insertNewEvent);

//SAT Routes
router.get('/api/sat', satController.listAll);
router.delete('/api/sat/:id', satController.destroy);
router.get('/api/sat/:student_id', satController.list);
router.post('/api/sat/:student_id', satController.insertNewData);
router.get('/api/sat_total_points/:student_id', satController.getTotalPoints);
router.get('/api/sat_needed_points/:student_id', satController.getReqPoints);

//SAT Event Routes
router.post('/api/satEvent', satEventController.insertNewEvent);
router.get('/api/satEvent', satEventController.getAllEvent);

//Financial Routes
router.get('/api/financial', financialController.listAll);
router.get('/api/financial/:student_id', financialController.list);
router.post('/api/financial/:student_id', financialController.insertNewData);
router.delete('/api/financial/:id', financialController.destroy);


//Bank Account Routes
router.get('/api/financialAcc/:student_id', financialAccController.list);
router.post('/api/financialAcc/:student_id', financialAccController.insertNewData);

//Course Routes
router.get('/api/course/', courseAccController.listAll);
router.post('/api/course/', courseAccController.create);

router.get('/api/takenCourse/', takenCourseAccController.listAll);
router.post('/api/takenCourse/', takenCourseAccController.insertNewData);

router.get('/api/classes/', classesController.listAll);
router.post('/api/classes/', classesController.insertNewData);
router.put('/api/classes/:id', classesController.update);

module.exports = router;