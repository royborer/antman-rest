function getOneQuestion (index) {
    const defaultQuestion = {  
        questionId : "123",
        question : "How old are you?",
        possibleAnswers : [ 
                            { id:"1", text:"below 18"},
                            { id:"2", text:"above 18"}
                        ],
        isLast: true
    };

    const quiz = getQuiz("dummy");
    if (index > quiz.length) return defaultQuestion;
    if (index <= 0) return quiz[0];

    return quiz[index-1];
}

function getQuiz(quizId) {
    // go to quiz DB and get by id quizId

    const hardCodedQuiz = [
        {  
            order: 1,
            questionId : "123",
            question : "How old are you?",
            possibleAnswers : [ 
                                { id:"1", text:"below 18"},
                                { id:"2", text:"above 18"}
                            ],
            isLast: false
        },

        
        {  
            order: 2,
            questionId : "126",
            question : "What do you think of Slim J S ?",
            possibleAnswers : [ 
                                { id:"1", text:"sucks"},
                                { id:"2", text:"great"}
                            ],
            isLast: false
        },

        {  
            order: 3,
            questionId : "124",
            question : "Do you use Java?",
            possibleAnswers : [ 
                                { id:"1", text:"yes"},
                                { id:"2", text:"no"}
                            ],
            isLast: false
        },

        {  
            order: 4,
            questionId : "129",
            question : "How many years of experience in Javascript?",
            possibleAnswers : [ 
                                { id:"1", text:"2 or less"},
                                { id:"2", text:"2 - 5 years"},
                                { id:"2", text:"more than 5 years"}
                            ],
            isLast: true
        }
    ];

    return hardCodedQuiz ;
}

module.exports = {
    getOneQuestion 
}