# antman-rest
Fuse 2018

Adding a user
-------------

POST
https://8yq3lyxdrb.execute-api.eu-west-3.amazonaws.com/dev/users
{ "userId":"user1", "name":"Avichay" }

(Headers: [{"key":"Content-Type","value":"application/json","description":""}])


Flow of REST requests from client to server
--------------------------------------------


GET https://8yq3lyxdrb.execute-api.eu-west-3.amazonaws.com/dev/getOneQuestion/1

returns:
{
    "order": 1,
    "questionId": "123",
    "question": "How old are you?",
    "possibleAnswers": [
        {
            "id": "1",
            "text": "below 18"
        },
        {
            "id": "2",
            "text": "above 18"
        }
    ],
    "isLast": false
}

https://8yq3lyxdrb.execute-api.eu-west-3.amazonaws.com/dev/putAnswer/user1/123/2

returns:
{
    "userId": "user1",
    "questionId": "123",
    "answer": "2"
}

https://8yq3lyxdrb.execute-api.eu-west-3.amazonaws.com/dev/getOneQuestion/2

{
    "order": 2,
    "questionId": "126",
    "question": "What do you think of Slim J S ?",
    "possibleAnswers": [
        {
            "id": "1",
            "text": "sucks"
        },
        {
            "id": "2",
            "text": "great"
        }
    ],
    "isLast": false
}

https://8yq3lyxdrb.execute-api.eu-west-3.amazonaws.com/dev/putAnswer/user1/126/2

returns:
{
    "userId": "user1",
    "questionId": "126",
    "answer": "2"
}

https://8yq3lyxdrb.execute-api.eu-west-3.amazonaws.com/dev/getOneQuestion/3

returns:
{
    "order": 3,
    "questionId": "124",
    "question": "Do you use Java?",
    "possibleAnswers": [
        {
            "id": "1",
            "text": "yes"
        },
        {
            "id": "2",
            "text": "no"
        }
    ],
    "isLast": true
}

https://8yq3lyxdrb.execute-api.eu-west-3.amazonaws.com/dev/putAnswer/user1/124/2

returns:
{
    "userId": "user1",
    "questionId": "124",
    "answer": "2"
}

...

in the end:

https://8yq3lyxdrb.execute-api.eu-west-3.amazonaws.com/dev/users/user1/answers

{
    "answers": [
        {
            "answer": "2",
            "questionId": "126"
        },
        {
            "answer": "2",
            "questionId": "123"
        },
        {
            "answer": "2",
            "questionId": "124"
        }
    ],
    "userId": "user1"
}
