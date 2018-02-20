function getOneQuestion (index) {
    return {  
        questionId : "123",
        question : "How old are you?",
        possibleAnswers : [ 
                            { id:"1", text:"below 18"},
                            { id:"2", text:"above 18"}
                        ],
        isLast: true
    };
}


module.exports = {
    getOneQuestion 
}