var student = require('./student');
var communityService = require('./community_service');
var sat = require('./sat');
var financial = require('./financial');
var financialAccount = require('./financialAccount');
var communityServiceEvent = require('./community_service_event');
var satEvent = require('./satEvent');
var course = require('./course');
var takenCourse = require('./takenCourse');
var classes = require('./classes');

module.exports = {
  communityService,
  communityServiceEvent,
  student,
  sat,
  financial,
  financialAccount,
  satEvent,
  course,
  takenCourse,
  classes
};