var QuestionModel = require("../models/question.js");

exports.postQuestion = function (request, response) {
	/*
		@params : 
			request : Request object which contains the parameters to be passed
			response : Response object which will send the response back to the client
		@returns :
			none : Response's send() will be called with the required parameters
                   to return data to the client
	*/

	//Extract arguments from the request object
	var args = request.body;

	console.log(args);

    console.log("postQuestion route can be accessed");
	QuestionModel.postQuestion(args, function (status) {
        console.log(status);
        response.send(status);
    });
};

exports.upvoteQuestion = function (request, response) {
	/*
		@params : 
			tokenID : Student token

		@returns :
			list of QuestionBoard objects
	*/
};

exports.deleteQuestion = function (request, response) {
	/*
		@params : 
			tokenID : Student token
			question_id : 

		@returns :
			list of QuestionBoard objects
	*/
};