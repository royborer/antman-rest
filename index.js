// index.js

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');
const getOneQuestion = require('./getOneQuestion');
const getAllQuestions = require('./getAllQuestions');
const putAnswer = require('./putAnswer');
const getResults = require('./getResults');
const getAllResults = require('./getAllResults');

const USERS_TABLE = process.env.USERS_TABLE;


const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  })
  console.log(dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json({ strict: false }));


app.get('/', function (req, res) {
  const data = getAllResults.getAllResults(dynamoDb);
  res.send('Hello Friend!! \nresults= \n' + data)
})

app.get('/getOneQuestion/:index', function (req, res) {
  const data = getOneQuestion.getOneQuestion(req.params.index);
  res.json(data);
})

// Get User endpoint
app.get('/users/:userId', function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get user' });
    }
    if (result.Item) {
      const {userId, name, options} = result.Item;
      res.json({ userId, name, options });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
})

// Create User endpoint
app.post('/users', function (req, res) {
  const { userId, name, options } = req.body;
  if (typeof userId !== 'string') {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
      options: options
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    }
    res.json({ userId, name, options });
  });
})


app.post("/users/answers", function (req, res) {
    putAnswer.putUserAnswer(dynamoDb, req, res);
})

app.get("/putAnswer/:user/:question/:myanswer", function (req, res) {
  const theAnswer = { userId: req.params.user, questionId: req.params.question, answer: req.params.myanswer }
  putAnswer.putUserAnswer(dynamoDb, theAnswer, res);
})
app.get("/users/:userId/answers", function (req, res) {
    getResults.getResultsForQuiz(dynamoDb, req, res);
})

app.get("/getAllResults", function (req, res) {
  const data = getAllResults.getAllResults(dynamoDb, req, res);
  res.json(data);
})

module.exports.handler = serverless(app);