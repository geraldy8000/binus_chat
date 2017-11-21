//Libraries
var apiai = require('apiai');

//Client access token from api ai
var app = apiai('5134580bde2e4d6c90cce366aca371ae ');

//Speech action response
var speech = require('../config/action_response');

var sat = require('../database/models').sat;

module.exports = function(io,req){

    //On connection
    io.on('connection', function(socket){

        //On send-message emit
        socket.on('send-message', function(data){
            
            //Get the question
            var request = app.textRequest(data.content,{
                sessionId: '0d4e8c3e-5abf-4f49-b637-03b1a93dd96e'
            });

            //Process response, and emit back the reply
            request.on('response', function(response){
                if(response.result.action === 'input.unknown'){
                    console.log(response); //debug
                    socket.emit('bot-reply', response.result.fulfillment.speech);
                }
                else if(response.result.action.match(/chat.*/)){
                    console.log(response); //debug
                    socket.emit('bot-reply', response.result.fulfillment.speech);
                }
                else{
                    console.log(response); //debug
                    speech(socket,response.result.action,data.uid,response.result.parameters.class);
                }
            })
            request.end();
        })
    })
}


