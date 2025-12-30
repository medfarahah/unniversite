export const MOCK_ANNOUNCEMENTS = [
    {
        id: '1',
        title: 'Midterm Exam Schedule',
        content: 'The midterm exams for the Fall semester will begin on January 15th. Please check your department boards for specific timings.',
        author: 'Academic Office',
        date: '2025-12-28',
        comments: [
            { id: 'c1', user: 'Mike Ross', content: 'Will it be online or on-campus?', date: '2025-12-28' },
        ],
    },
    {
        id: '2',
        title: 'New Library Opening Hours',
        content: 'Starting next week, the central library will be open 24/7 to support students during the exam period.',
        author: 'Library Services',
        date: '2025-12-27',
        comments: [],
    },
    {
        id: '3',
        title: 'Scholarship Applications Open',
        content: 'Applications for the Merit Scholarship are now open. Deadline is January 30th.',
        author: 'Student Affairs',
        date: '2025-12-26',
        comments: [],
    },
];

export const MOCK_GROUPS = [
    {
        id: 'g1',
        name: 'CS Year 3 - Main',
        description: 'General discussion for 3rd year Computer Science students.',
        messages: [
            { id: 'm1', sender: 'Alice', content: 'Did anyone figure out Question 4 on the assignment?', type: 'received' },
            { id: 'm2', sender: 'Bob', content: 'Yeah, I used Dijkstra algorithm.', type: 'received' },
            { id: 'm3', sender: 'You', content: 'I still haven\'t started lol', type: 'sent' },
        ],
    },
    {
        id: 'g2',
        name: 'Project Group 7',
        description: 'Design Project - Team 7',
        messages: [],
    },
];

export const MOCK_TIMETABLE = {
    Monday: [
        { id: 't1', subject: 'Software Engineering', time: '09:00 - 11:00', room: 'Hall A' },
        { id: 't2', subject: 'Database Systems', time: '13:00 - 15:00', room: 'Room 302' },
    ],
    Tuesday: [
        { id: 't3', subject: 'Web Development', time: '10:00 - 12:00', room: 'Lab 1' },
    ],
    Wednesday: [
        { id: 't4', subject: 'Cloud Computing', time: '09:00 - 11:00', room: 'Hall B' },
        { id: 't5', subject: 'Machine Learning', time: '14:00 - 16:00', room: 'Lab 2' },
    ],
    Thursday: [
        { id: 't6', subject: 'Network Security', time: '11:00 - 13:00', room: 'Room 101' },
    ],
    Friday: [
        { id: 't7', subject: 'Professional Ethics', time: '09:00 - 11:00', room: 'Hall C' },
    ],
};

export const MOCK_GRADES = [
    {
        id: 's1', semester: 'Semester 5', gpa: '3.8', courses: [
            { name: 'Operating Systems', grade: 'A', credits: 4 },
            { name: 'Computer Networks', grade: 'A-', credits: 3 },
            { name: 'Human Computer Interaction', grade: 'B+', credits: 3 },
        ]
    },
    {
        id: 's2', semester: 'Semester 4', gpa: '3.6', courses: [
            { name: 'Data Structures', grade: 'A', credits: 4 },
            { name: 'Discrete Math', grade: 'B', credits: 3 },
            { name: 'OOP', grade: 'A', credits: 4 },
        ]
    },
];
