var Question = require('../schemas/schemas.js').Question,
	QuestionBoard = require('../schemas/schemas.js').QuestionBoard;

const successMessage = "SUCCESS";
const failMessage = "FAIL";
const notFoundMessage = "QuestionBoard not found";
const existingUpvoteMessage = "CANNOT UPVOTE TWICE";

exports.postQuestion = function (args, callback) {
	/*
		@params : 
			tokenID : Student token
			question : Question description
			questionBoardId : Question Board to post to
			isAnonymous : Should the question be posted anonymously
			callback : The final result should be passed to the callback
		@returns :
			callback is called with a status message
	*/

	//Get parameter values
	var studentId = args.studentId,
		questionBoardId = args.questionBoardId,
		description = args.description,
		title = args.title,
		isAnonymous = args.isAnonymous;

	//Prepare return message

	//validation of arguments passed if required
	QuestionBoard.findById(questionBoardId, function (findError, questionBoard) {
		if(!findError) {
			if(questionBoard) {
				var questionProperties = {};

				questionProperties.author = studentId;
				questionProperties.description = description;
				questionProperties.isAnonymous = isAnonymous;
				questionProperties.voters = [];
				questionProperties.title = title;
				questionProperties.lastUpdated = Date.now();
				questionProperties.questionBoardId = questionBoardId;
				questionProperties.isDeleted = false;

				var newQuestion = new Question(questionProperties);

				newQuestion.save(function (saveError, savedQuestion) {
					if(saveError) {
						console.log("Error encountered while adding Question");
						console.log(saveError);
						callback(failMessage);
					} else {
						console.log("QuestionBoard successfully updated");
						callback(successMessage);
					}
				});
			} else {
				console.log("QuestionBoard not found");
				callback(failMessage);
			}
		} else {
			console.log("Error encountered while finding QuestionBoard");
			console.log(findError);
			callback(failMessage);
		}
	});

};

exports.upvoteQuestion = function (args, callback) {
	/*
		@params : 
			studentId : Matric. number of the student upvoting
			questionBoardId : Question Board of the question
			questionId : Id of the question to be upvoted
			callback : The final result should be passed to the callback
		@callback :
			status : Status of the query
	*/

	//Get parameter values
	var studentId = args.studentId,
		questionBoardId = args.questionBoardId,
		question = args.question;

	//Prepare return message
	var returnObject = null;

	//validation of arguments passed if required

	QuestionBoard.find(questionBoardId, function (findQuestionBoardError, questionBoard) {
		if(!findQuestionBoardError) {
			if(questionBoard) {
				//SUCCESS IN FINDING QuestionBoard

			} else {
				//QuestionBoard does not exist
				callback(notFoundMessage);
			}
		} else {
			//ERROR WHILE TRYING TO RETRIEVE QuestionBoard
			console.log(findQuestionBoardError);
			callback(failMessage);
		}
	});
};


exports.deleteQuestion = function (args, callback) {
	/*
		@params : 
			tokenID : Student token
			question_id : 

		@returns :
			list of QuestionBoard objects
	*/
};