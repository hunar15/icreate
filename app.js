
/**
 * Module dependencies.
 */

var express = require('express'),
    questionRouteHandler = require('./routes/question.js'),
    questionBoardRouteHandler = require('./routes/questionBoard.js'),
    http = require('http'),
    path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.post('/questionBoard/isUpdateRequired', questionBoardRouteHandler.isUpdateRequired);
app.post('/questionBoard/fetchUpdatesForQuestionBoard', questionBoardRouteHandler.fetchUpdatesForQuestionBoard);

app.post('/question/add', questionRouteHandler.postQuestion);
app.post('/questionBoard/add', questionBoardRouteHandler.createQuestionBoard);

app.post('/questionBoard/delete', questionBoardRouteHandler.deleteQuestionBoard);
app.get('/questionBoard/:id', questionBoardRouteHandler.viewQuestionBoard);
app.post('/questionBoards', questionBoardRouteHandler.viewAvailableQuestionBoards);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
