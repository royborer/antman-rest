
function getAllResults () {


    const params = {
        TableName: USERS_ANSWERS_TABLE,
        Key: {
          userId: "evyatar",
        },
    }

    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).json({ error: 'Could not get all results' });
        }

        res.json( result );
    });

}


module.exports = {
    getAllResults 
}