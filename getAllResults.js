
const USERS_ANSWERS_TABLE = process.env.USER_ANSWERS_TABLE;

function getAllResults (dynamoDb, req, res) {

    //return "Not Yet Implemented";

    const params = {
        TableName: USERS_ANSWERS_TABLE,
        Key: {
          userId: "evyatar",
        },
    }

    dynamoDb.get(params, (error, result) => {
        //return "Not Yet Implemented";
        if (error) {
            //console.log(error);
            //return { error: 'Could not get all results' };
            return "some error has occured";
        }
        else {
            //return result ;
            return "some result has been gathered";
        }
    });

}


module.exports = {
    getAllResults 
}