const data = {
    "id": 1,
    "title": "Exam - 3",
    "duration": 5,
    "startDate": "2024-4-3",
    "startTime": "14:50",
    "candidateName": "Karm",
    "candidateEmail": "k@gmail.com",
    "questionIds": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
    ],
    "rotationFactor": 2
}

const q1 = {
    "id": 1,
    "statement": "Exam - 3 Q - 1",
    "type": "msq",
    "hasImage": true,
    "positiveMarks": 4,
    "negativeMarks": -1,
    "options": [
        {
            "id": 1,
            "statement": "q1 option A",
            "hasImage": false,
            "imageURL": "",
            "isMarked": true
        },
        {
            "id": 2,
            "statement": "q1 option B",
            "hasImage": false,
            "imageURL": "",
            "isMarked": true
        },
        {
            "id": 3,
            "statement": "q1 option C",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 1 Option - C",
            "isMarked": false
        },
        {
            "id": 4,
            "statement": "q1 option D",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 1 Option - D",
            "isMarked": false
        }
    ],
    "imageURL": "https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=612x612&w=0&k=20&c=i4HYO7xhao7CkGy7Zc_8XSNX_iqG0vAwNsrH1ERmw2Q="
};

const q2 = {
    "id": 2,
    "statement": "Exam - 3 Q - 2",
    "type": "msq",
    "hasImage": true,
    "positiveMarks": 5,
    "negativeMarks": 0,
    "options": [
        {
            "id": 5,
            "statement": "q2 option A",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 6,
            "statement": "q2 option B",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 7,
            "statement": "q2 option C",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 2 Option - C",
            "isMarked": false
        },
        {
            "id": 8,
            "statement": "q2 option D",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 2 Option - D",
            "isMarked": true
        }
    ],
    "imageURL": "URL Exam - 3 Q - 2"
};

const q3 = {
    "id": 3,
    "statement": "Exam - 3 Q - 3",
    "type": "mcq",
    "hasImage": true,
    "positiveMarks": 4,
    "negativeMarks": -1,
    "options": [
        {
            "id": 9,
            "statement": "Option A",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 10,
            "statement": "Option B",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 11,
            "statement": "Option C",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 3 Option - C",
            "isMarked": false
        },
        {
            "id": 12,
            "statement": "Option D",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 3 Option - D",
            "isMarked": false
        }
    ],
    "imageURL": "URL Exam - 3 Q - 3"
};

const q4 = {
    "id": 4,
    "statement": "Exam - 3 Q - 4",
    "type": "mcq",
    "hasImage": true,
    "positiveMarks": 4,
    "negativeMarks": -1,
    "options": [
        {
            "id": 9,
            "statement": "Option A",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 10,
            "statement": "Option B",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 11,
            "statement": "Option C",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 3 Option - C",
            "isMarked": false
        },
        {
            "id": 12,
            "statement": "Option D",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 3 Option - D",
            "isMarked": false
        }
    ],
    "imageURL": "URL Exam - 3 Q - 3"
};

const q5 = {
    "id": 5,
    "statement": "Exam - 3 Q - 5",
    "type": "mcq",
    "hasImage": true,
    "positiveMarks": 4,
    "negativeMarks": -1,
    "options": [
        {
            "id": 9,
            "statement": "Option A",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 10,
            "statement": "Option B",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 11,
            "statement": "Option C",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 3 Option - C",
            "isMarked": false
        },
        {
            "id": 12,
            "statement": "Option D",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 3 Option - D",
            "isMarked": false
        }
    ],
    "imageURL": "URL Exam - 3 Q - 3"
};

const q6 = {
    "id": 6,
    "statement": "Exam - 3 Q - 6",
    "type": "mcq",
    "hasImage": true,
    "positiveMarks": 4,
    "negativeMarks": -1,
    "options": [
        {
            "id": 9,
            "statement": "Option A",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 10,
            "statement": "Option B",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 11,
            "statement": "Option C",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 3 Option - C",
            "isMarked": false
        },
        {
            "id": 12,
            "statement": "Option D",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 3 Option - D",
            "isMarked": false
        }
    ],
    "imageURL": "URL Exam - 3 Q - 3"
};

const q7 = {
    "id": 7,
    "statement": "Exam - 3 Q - 7",
    "type": "mcq",
    "hasImage": true,
    "positiveMarks": 4,
    "negativeMarks": -1,
    "options": [
        {
            "id": 9,
            "statement": "Option A",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 10,
            "statement": "Option B",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 11,
            "statement": "Option C",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 3 Option - C",
            "isMarked": false
        },
        {
            "id": 12,
            "statement": "Option D",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 3 Option - D",
            "isMarked": false
        }
    ],
    "imageURL": "URL Exam - 3 Q - 3"
};

const q8 = {
    "id": 8,
    "statement": "Exam - 3 Q - 8",
    "type": "mcq",
    "hasImage": true,
    "positiveMarks": 4,
    "negativeMarks": -1,
    "options": [
        {
            "id": 9,
            "statement": "Option A",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 10,
            "statement": "Option B",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 11,
            "statement": "Option C",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 3 Option - C",
            "isMarked": true
        },
        {
            "id": 12,
            "statement": "Option D",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 3 Option - D",
            "isMarked": false
        }
    ],
    "imageURL": "URL Exam - 3 Q - 3"
};

const q9 = {
    "id": 9,
    "statement": "Exam - 3 Q - 9",
    "type": "mcq",
    "hasImage": true,
    "positiveMarks": 4,
    "negativeMarks": -1,
    "options": [
        {
            "id": 9,
            "statement": "Option A",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 10,
            "statement": "Option B",
            "hasImage": false,
            "imageURL": "",
            "isMarked": false
        },
        {
            "id": 11,
            "statement": "Option C",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 3 Option - C",
            "isMarked": false
        },
        {
            "id": 12,
            "statement": "Option D",
            "hasImage": true,
            "imageURL": "URL Exam - 3 Q - 3 Option - D",
            "isMarked": false
        }
    ],
    "imageURL": "URL Exam - 3 Q - 3"
};

export { data, q1, q2, q3, q4, q5, q6, q7, q8, q9 };