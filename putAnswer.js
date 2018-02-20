const USERS_ANSWERS_TABLE = process.env.USER_ANSWERS_TABLE;


function putUserAnswer(dynamoDb, req, res) {
   const { userId, questionId, answer } = req.body;
        if (typeof userId !== 'string') {
            res.status(400).json({ error: '"userId" must be a string' });
        } else if (typeof questionId !== 'string') {
            res.status(400).json({ error: '"name" must be a string' });
        }
        else if (typeof answer !== 'string') {
            res.status(400).json({ error: '"name" must be a string' });
        }

        const params = {
            TableName: USERS_ANSWERS_TABLE,
            Item: {
                userId: userId,
                questionId: questionId,
                answer: answer
            },
        };

        dynamoDb.put(params, (error) => {
            if (error) {
                console.log(error);
                res.status(400).json({ error: 'Could not create user' });
            }
            res.json({ userId, questionId, answer });
        });
}

module.exports = {
    putUserAnswer
}