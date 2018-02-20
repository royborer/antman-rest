const USERS_ANSWERS_TABLE = process.env.USER_ANSWERS_TABLE;

function getResultsForQuiz (dynamoDb, req, res) {
    const userId = req.params.userId;
    const quizId = req.params.quizId || '1';

    if (typeof userId !== 'string') {
        res.status(400).json({ error: '"userId" must be a string' });
    } else if (typeof quizId !== 'string') {
        res.status(400).json({ error: '"quizId" must be a string' });
    }

    const params = {
        TableName: USERS_ANSWERS_TABLE,
        Key: {
          userId: userId,
        },
    }

    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).json({ error: 'Could not get user answers' });
        }
        if (result != null && result.Item) {
            console.log(result.Item);

            //const {userId, questionId} = result.Item;
            res.json( result.Item );
        } else {
            res.status(200).json({ error: "User has no answers" });
        }
    });

}


module.exports = getResultsForQuiz;