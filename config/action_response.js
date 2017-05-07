//Require controller
var comServiceController = require('../database/controllers').communityService;
var comServiceEventController = require('../database/controllers').communityServiceEvent;
var satController = require('../database/controllers').sat;
var satEventController = require('../database/controllers').satEvent;
var financialAccountController = require('../database/controllers').financialAccount;
var financialController = require('../database/controllers').financial;
var takenCourseController = require('../database/controllers').takenCourse;
var courseController = require('../database/controllers').course;
var classesController = require('../database/controllers').classes;
var dateFormat = require('dateformat');

module.exports = function(io,speech,u_id,param){
    var message;
    var uid = parseInt(u_id);
    switch(speech){

        /* -------------------------------------------------------------------------------------
        *                                  COMMUNITY SERVICE
        * ------------------------------------------------------------------------------------- */

        /* Explain what is community service */
        case "whatIsCommunityService":
            message = "Ok, let me explain! <br /><br />" +
                      "Community service is a volunteer work that you have to do within your time in Binus. <br /><br />" +
                      "Inorder for you to graduate, you need 30 hours of community service work which has to be submitted directly to SAGE. <br /><br />" +
                      "I could also help you show current events, current points and more!";

            io.emit('bot-reply', message);
            break;
        /* Explain what is community service */

        /* Retrieve current community service points held by student */
        case "currentCommunityServicePoints":

            comServiceController.getTotalCommunityServiceHour()
                .then((points) => {

                    comServiceController.getFinishedActivity()
                        .then( (activity) => {
                            var remaining_points_to_earn = 30 - points;
                            var activities_string = "";

                            activity.forEach(function(data){
                                activities_string += data.activity_name + " - " + data.project_name + ": " + data.hours + " hours <br /><br />";
                            });

                            io.emit('bot-reply', "You currently held " + points + " out of 30 points.<br /><br />" +
                                    activities_string);

                            io.emit('bot-reply', "It seems that you're still missing about " + remaining_points_to_earn + " points.<br /><br />"+
                                    "Do you want me to show you upcoming community service events by Binus?");
                        })
                        .catch((error) => io.emit('bot-reply', error));
                })

            break;
        /* Retrieve current community service points held by student */

        /* Show current community service events */
        case "showCurrentCommunityServiceEvents":
        
            comServiceEventController.getEvents()
                .then((events) => {
                    var events_string = "";

                    events.forEach(function(data){
                        events_string += data.activity_name + " - " + data.project_name + ": " + data.hours + "<br /><br />";
                    });

                    io.emit('bot-reply', "These are the list of upcoming community service events!<br /><br />" +
                                         events_string);

                    console.log(events);
                })
            break;

        /* Show current community service events */

        /* User said no when asked if she wants to see current community service events  */    
        case "doNotShowCurrentCommunityServiceEvents":

            io.emit('bot-reply', "Ok then!");

            break;
        /* User said no when asked if she wants to see current community service events  */    

        /* User asks to how to submit comm service data  */
        case "submitActivityData":

            io.emit('bot-reply', "I currently cannot handle data submission for community service nor SAT")

            break;

        ///////SAT CONTROLLER//////

        case "whatIsSat":
            message = "SAT or Student Academic Transcript is a records of students activities and contributions for " + 
                        "Binus International during their study years.<br/><br/>Each activity attended by students will generate " + 
                        "some points depending on the participation of the students. Students are mandatory " + 
                        "to gain 120 points before they are graduated.";

            io.emit('bot-reply', message);
            break;

        case "currentSatPoints":

            satController.getTotalSatPoints()
                .then((points) => {
                    if(!points)
                    {
                        io.emit('bot-reply', "None");
                    }
                    else
                    {    
                        satController.getSatDetails()
                            .then( (details) => {
                                var activities = "";

                                details.forEach(function(data) {
                                    activities += data.title + " - " + data.organization + ": " + data.points + "<br />";
                                });

                                io.emit('bot-reply', "You ammased a total of " + points + " points out of 120 points. <br/><br/>" +
                                    " Here is your SAT summary: </br>" +
                                    activities);
                            });
                    }
                })
            break;

        case "showSatEvents":
            satEventController.getAllEvents()
                .then((events) => {
                    var details = "";

                        events.forEach(function(data) {
                            data.event_date = dateFormat(data.event_date, "isoDate");
                            details += data.name + " - " + data.organization + ": " + data.event_date + "<br />";
                        });

                        io.emit('bot-reply', "Here some upcoming events: <br/><br/>" +
                            details);
                })
            break; 

        ///////FINANCIAL CONTROLLER//////

        case "financialShowAccount":
            financialAccountController.getBankAccount(uid)
                .then((account) => {
                    io.emit('bot-reply', "Your bank account is: " + account.bank_account + "</br></br>"+
                            "Your virtual account is: " + account.virtual_account);
                })
            break;

        case "financialShowBill":
            financialController.getTotalCharge()
                .then((charge) => {
                    financialController.getTotalPayment()
                        .then((payment) => {
                            var bill = charge - payment;
                            financialController.getFinancialDetails()
                                .then((finances) => {
                                    var details = "";

                                    finances.forEach(function(data) {
                                        data.due_date = dateFormat(data.due_date, "isoDate");
                                        if(data.charge != 0)
                                        {
                                            details += data.item + " - " + data.term + " - Charge: Rp." + data.charge + " - " + data.due_date + "<br />";
                                        }
                                        else if(data.payment != 0)
                                        {
                                            details += data.item + " - " + data.term + " - Payment: Rp." + data.payment + " - " + data.due_date + "<br />";
                                        }
                                        
                                    });

                                    io.emit('bot-reply', details);
                                })
                            
                        })    
                })
            break;

        /////////COURSE CONTROLELR/////////

        case "askCourses":
        var courseDetails = "";
        	takenCourseController.getSchedule()
        		.then((schedules) =>{    		
					schedules.forEach(function(data, index) {
						courseController.getCourseDetails(data.course_id)
							.then((courses) => {
								classesController.getDetails(data.course_id, data.class_id)
									.then((classes) => {
                                		classes.forEach(function(data2) {
                                            courseDetails += data.course_id + " - " + courses.course_name + " - " + data.class_id + " - " + data2.day + ", " + data2.time +"<br />";
                                        });
                                        

                                		if(index == schedules.length - 1){
                                    		io.emit('bot-reply', courseDetails);
                                		}
                                	})
                            })										
					});	
        		})
            break;

        case "askSchedule":
        //var param = "Networking";
        courseController.getCourse(param)
            .then((course) => {
                takenCourseController.checkStudent(course.course_id)
                    .then((tClass) => {
                        if(!tClass){
                            io.emit('bot-reply', "You're not in class");
                        }
                        else{
                            classesController.getDetails(tClass.course_id, tClass.class_id)
                            .then((classes) => {
                                var classDetails = "";
                                classes.forEach(function(data) {
                                            classDetails += course.course_name + " - " + data.time +"<br /> <br />";
                                });
                                
                                io.emit('bot-reply', classDetails);
                            })
                        }
                    })

            })
            .catch(error => io.emit('bot-reply', "Claas not found"));
    }
}