var Student = require('../schemas/schemas.js').StudentModel;

exports.loginStudent = function (args, callback) {
	// body...
};

exports.logoutStudent = function (args, callback) {
	// is this needed at all?
};

exports.fetchModuleList = function (args, callback) {
	/*
		@params : 
			tokenID : Student token
			callback : The final result should be passed to the callback
		@returns :
			callback is called with the list of student modules
	*/

	//Fetch arguments
	var tokenId = args.id;

	//Prepare object to be returned
	var returnObject = null,
		

	//Fetch studentId from tokenId
	var studentId = "some studentId";

	Student.find({ "studentId" : studentId}, function (findError, student) {
		if(!findError) {
			if(student) {
				//SUCCESS CASE
			} else {
				//Student not found
			}
		} else {
			//ERROR WHILE EXECUTING find()

		}
	});
};