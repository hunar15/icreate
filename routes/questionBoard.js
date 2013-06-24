var QuestionBoardModel = require("../models/questionBoard.js");

// actions on ACTIVE QuestionBoards
exports.viewAvailableQuestionBoards = function (request, response) {
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

    console.log("viewAvailableQuestionBoards route can be accessed");
	QuestionBoardModel.viewAvailableQuestionBoards(args, function (errorMessage, listOfQuestionBoards) {
		if(errorMessage) {
			console.log(listOfQuestionBoards);
			response.send(errorMessage);
		} else {
			response.send(listOfQuestionBoards);
		}
    });
};

exports.viewQuestionBoard = function (request, response) {
	/*
		@params : 
			request : Request object which contains the parameters to be passed
			response : Response object which will send the response back to the client
		@returns :
			none : Response's send() will be called with the required parameters
                   to return data to the client
	*/

	//Extract arguments from the request object
	var args = request.params;

    console.log("viewQuestionBoard route can be accessed");
	QuestionBoardModel.viewQuestionBoard(args, function (errorMessage, questionBoard) {
		if(errorMessage) {
			console.log(questionBoard);
			response.send(errorMessage);
		} else {
			response.send(questionBoard);
		}
    });
};

exports.createQuestionBoard = function  (request, response) {
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

    console.log("createQuestionBoard route can be accessed");
	QuestionBoardModel.createQuestionBoard(args, function (status) {
        console.log(status);
        response.send(status);
    });
};

exports.deleteQuestionBoard = function  (request, response) {
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

    console.log("deleteQuestionBoard route can be accessed");
	QuestionBoardModel.deleteQuestionBoard(args, function (status) {
        console.log(status);
        response.send(status);
    });
};

exports.isUpdateRequired = function  (request, response) {
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

    console.log("isUpdateRequired route can be accessed");
	QuestionBoardModel.isUpdateRequired(args, function (status) {
        console.log(status);
        response.send(status);
    });
};

exports.fetchUpdatesForQuestionBoard = function  (request, response) {
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

    console.log("fetchUpdatesForQuestionBoard route can be accessed");
	QuestionBoardModel.fetchUpdatesForQuestionBoard(args, function (error, updateList) {
		if(!error) {
			response.send(updateList);
		} else {
			response.send(error);
		}
    });
};