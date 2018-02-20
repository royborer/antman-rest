
const USERS_ANSWERS_TABLE = process.env.USER_ANSWERS_TABLE;

function getAllResults (dynamoDb, req) {


    const params = {
        TableName: USERS_ANSWERS_TABLE,
        Key: {
          userId: "evyatar",
        },
    }

    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.log(error);
            return { error: 'Could not get all results' };
        }

        return result ;
    });

}


module.exports = {
    getAllResults 
}