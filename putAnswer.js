const getResults = require('./getResults');

const USERS_ANSWERS_TABLE = process.env.USER_ANSWERS_TABLE;

function putUserAnswer(dynamoDb, theAnswer) {
    const { userId, questionId, answer } = theAnswer;

    if (typeof userId !== 'string') {
       res.status(400).json({ error: '"userId" must be a string' });
    } else if (typeof questionId !== 'string') {
        res.status(400).json({ error: '"name" must be a string' });
    }
    else if (typeof answer !== 'string') {
        res.status(400).json({ error: '"name" must be a string' });
    }

    const params_get = {
        TableName: USERS_ANSWERS_TABLE,
        Key: {
          userId: userId,
        },
    }

    dynamoDb.get(params_get, (error, result) => {
        prevAnswers = [];
        if (error) {
            console.log(error);
            res.status(400).json({ error: 'ERROR' });
        }
        if (result != null && result.Item) {
            console.log(result.Item);
            prevAnswers = result.Item.answers;
        }

        prevAnswers.push({questionId: questionId, answer: answer})

        const params = {
            TableName: USERS_ANSWERS_TABLE,
            Item: {
                userId: userId,
                answers: prevAnswers
            },
       };

        dynamoDb.put(params, (error) => {
            if (error) {
                console.log(error);
                res.status(400).json({ error: 'Could not create user' });
            }
            res.status(200).json({ userId, questionId, answer });
        });
    });

}

module.exports = {
    putUserAnswer
}