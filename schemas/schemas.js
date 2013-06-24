var mongoose = require('mongoose'),
	config_properties = require('../config/db.js');

mongoose.connect(config_properties.db_url);

var StudentSchema = mongoose.Schema({
	studentId : { type : String, unique : true },
	modules : [ String ]
});


/*
	Reasoning : Upvotes and downvotes on a questions will constitute 
		a major chunk of the API calls made. Embedding will first require first 
		searching the required board and then the required question, most probably in O(n+m),
		whereas reference will involve O( n x m). 
*/
var QuestionBoardSchema = mongoose.Schema({
	creator : String,
	name : String,
	description : String,
	module : String,
	questions : [{ type : mongoose.Schema.Types.ObjectId, ref : "Question"}]
});

var QuestionSchema = mongoose.Schema({
	author : String,
	questionBoardId : { type : mongoose.Schema.Types.ObjectId, ref : "QuestionBoard"},
	title : String,
	description : String,
	anon : Boolean,
	isDeleted : Boolean,
	lastUpdated : Date,
	voters : [{ studentId : String}]
});

// var StudentSchema = mongoose.Schema({
//	matric_number : String,
//	remaining_credits : Number,
//	interested_modules : [{ type : String, ref : "ModuleSchema" }]
//});

// ModuleSchema.index({ module_code : 1 });
// StudentSchema.index({ matric_number : 1, { unique : true });

// exports.Module = mongoose.model('Module',ModuleSchema);
// exports.Question = mongoose.model('Question',QuestionSchema);
exports.Question = mongoose.model('Question', QuestionSchema);
exports.QuestionBoard = mongoose.model('QuestionBoard',QuestionBoardSchema);
exports.Student = mongoose.model('Student',StudentSchema);



