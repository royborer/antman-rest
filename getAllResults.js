
const USERS_ANSWERS_TABLE = process.env.USER_ANSWERS_TABLE;

function getAllResults (dynamoDb, req, res) {


    const params = {
        TableName: USERS_ANSWERS_TABLE,
        Key: {
          userId: "evyatar",
        },
    }

    dynamoDb.get(params, (error, result) => {
        return "Not Yet Implemented";
        // if (error) {
        //     //console.log(error);
        //     return { error: 'Could not get all results' };
        // }
        // else {
        //     return result ;
        // }
    });

}


module.exports = {
    getAllResults 
}