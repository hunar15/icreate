var Schema = require("../schemas/schemas.js"),
	QuestionBoard = Schema.QuestionBoard,
	Question = Schema.Question,
	Student = Schema.Student;

const successMessage = "SUCCESS";
const failMessage = "FAIL";
const notFoundMessage = "QuestionBoard NOT FOUND";
const updateRequired = "UPDATE REQUIRED";
const updateNotRequired = "UPDATE NOT REQUIRED";
const studentNotFoundMessage = "Student NOT FOUND";

// actions on ACTIVE QuestionBoards
exports.viewAvailableQuestionBoards = function (args, callback) {
	/*
		@params : 
			studentId : Matric. number of the student

		@callback :
			errorMessage : Messages of errors, if any
			returningObject : List of QuestionBoard objects
	*/

	//Get parameter values
	var studentId = args.studentId;
	//Prepare return message

	var returnObject = null,
		errorMessage = null;

	//Validate input parameters if required

	Student.findOne({ "studentId" : studentId}, function (findStudentError, student) {
		if(!findStudentError) {
			if(student) {
				//Student successfully found
				var moduleList = student.modules;

				//Create query for finding available QuestionBoards
				QuestionBoard.find().where("module").in(moduleList)
				.exec(function (findQuestionBoardError, questionBoardList) {
						if(!findQuestionBoardError) {
							if(questionBoardList) {
								returnObject = questionBoardList;
							} else {
								returnObject = [];
							}
							errorMessage = null;
						} else {
							//Error encountered while trying to retrieve QuestionBoards
							returnObject = null;
							errorMessage = failMessage;
						}
						callback(errorMessage,returnObject);
					});
			} else {
				//Student not found
				returnObject = null;
				errorMessage = studentNotFoundMessage;
				callback(errorMessage, returnObject);
			}
		} else {
			//Error encountered while trying to retrieve student details
			console.log(findStudentError);
			returnObject = null;
			errorMessage = failMessage;
			callback(errorMessage, returnObject);
		}
	});
};

exports.viewQuestionBoard = function (args, callback) {
	/*
		@params : 
			id : Id of the QuestionBoard in question

		@callback :
			errorMessage : Contains message in case of errors, otherwise null
			returnObject : Object containing the details of the QuestionBoard queried
	*/

	//Get parameter values
	var questionBoardId = args.id;

	//Prepare return message

	var returnObject = null,
		errorMessage = null;

	//Validate different parameters
	QuestionBoard.findById(questionBoardId, function (findError, queriedQuestionBoard) {
		if(!findError) {
			if(queriedQuestionBoard) {
				//SUCCESS CASE
				returnObject = {};
				returnObject.name = queriedQuestionBoard.name;
				returnObject.description = queriedQuestionBoard.description;
				returnObject.module = queriedQuestionBoard.module;
				errorMessage=null;
			} else {
				//BOARD NOT FOUND
				returnObject = null;
				errorMessage = notFoundMessage;
			}
		} else {
			//ERROR WHILE TRYING TO FIND
			console.log(findError);
			returnObject = null;
			errorMessage = failMessage;
		}

		callback(errorMessage,returnObject);
	});
};

exports.createQuestionBoard = function  (args, callback) {
	/*
		@params : 
			tokenID : Staff token
			module : Module for which to create QuestionBoard
			name : Name of QuestionBoard
			description : A short description of the QuestionBoard

		@callback :
			status : Indicates whether Question Board was successfully created or not
	*/

	//Get parameter values
	var staffId = args.staffId,
		module = args.module,
		name = args.name,
		description = args.description;

	//Prepare return message

	//Validate different parameters

	var questions = [];

	var newQuestionBoard = new QuestionBoard({
		"creator" : staffId,
		"name" : name,
		"description" : description,
		"module" : module
	});

	newQuestionBoard.save(function (saveError, savedQuestionBoard) {
		if(saveError) {
			console.log(saveError);
			callback(failMessage);
		} else {
			callback(successMessage);
		}
	});
};

exports.deleteQuestionBoard = function (args, callback) {
	/*
		@params : 
			tokenID : Staff token
			questionBoardId : Id of the QuestionBoard to be deleted

		@callback :
			status : Indicates whether Question Board was successfully created or not
	*/

	//Get parameter values
	var staffId = args.staffId,
		questionBoardId = args.questionBoardId;

	//Prepare return message

	//Validate different parameters

	QuestionBoard.findByIdAndRemove(questionBoardId, function (findAndRemoveError, removedQuestionBoard) {
		if(findAndRemoveError) {
			console.log("Error encountered while finding and deleting QuestionBoard");
			callback(failMessage);
		} else {
			if(removedQuestionBoard) {
				console.log("QuestionBoard successfully deleted");
				callback(successMessage);
			} else {
				console.log("QuestionBoard not found");
				callback(notFoundMessage);
			}
		}
	});
};

exports.isUpdateRequired = function (args, callback) {
	/*
		@params : 
			questionBoardId : Id of the QuestionBoard in question
			clientTimestamp : Timestamp of when the client was last updated. Set to 0 for fetching all details

		@callback :
			status : If 
	*/

	var questionBoardId = args.questionBoardId,
		clientTimestamp = args.clientTimestamp;

	//Prepare the object to be returned
	var statusMessage = null;

	//Validate arguments if required

	Question.findOne({
		"questionBoardId" : questionBoardId,
		lastUpdated : { $gte : clientTimestamp }
		}, "title", function (findError, question) {
			if(!findError) {
				if(question) {
					//UPDATE REQUIRED
					statusMessage = updateRequired;
				} else {
					//UPDATE NOT REQUIRED
					statusMessage = updateNotRequired;
				}
			} else {
				//Error while trying to execute query
				statusMessage = failMessage;
			}
			callback(statusMessage);
	});
};

exports.fetchUpdatesForQuestionBoard = function (args, callback) {
	/*
		@params : 
			questionBoardId : Id of the QuestionBoard in question
			clientTimestamp : Timestamp of when the client was last updated. Set to 0 for fetching all details

		@callback :
			errorMessage : Contains message in case of errors, otherwise null
			returnObject : Object containing the all the necessary updates
	*/

	var questionBoardId = args.questionBoardId,
		clientTimestamp = args.clientTimestamp;

	//Prepare the object to be returned
	var errorMessage = null,
		returnObject = null;

	//Validate arguments if required 

	//Fetch all updates such the timestamp of the update is greater than the client timestamp

	var query = Question.find({ "questionBoardId" : questionBoardId });

	query.where('lastUpdated').gt(clientTimestamp)
		.exec(function (queryError, questionList) {
			if(!queryError) {
				if(questionList) {
					for(var currentIndex in questionList) {
						var tempLength = questionList[currentIndex].voters.length;
						questionList[currentIndex].voters = null;
						questionList[currentIndex].upvoteCount = tempLength;
					}
					errorMessage = null;
					returnObject = questionList;
				} else {
					//NO UPDATES - Ideally should not be accessible
					errorMessage = null;
					returnObject = [];
				}
			} else {
				//Error while executing query
				errorMessage = failMessage;
				returnObject = null;
			}
			callback(errorMessage, returnObject);
		});
};