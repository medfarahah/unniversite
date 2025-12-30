export const MOCK_ANNOUNCEMENTS = [
    {
        id: '1',
        title: 'Midterm Exam Schedule',
        content: 'The midterm exams for the Fall semester will begin on January 15th. Please check your department boards for specific timings.',
        author: 'Academic Office',
        date: '2025-12-28',
        isGlobal: true,
        authorId: 'admin-01',
        comments: [
            { id: 'c1', user: 'Med Omar', content: 'Will it be online or on-campus?', date: '2025-12-28' },
        ],
    },
    {
        id: '2',
        title: 'New Library Opening Hours',
        content: 'Starting next week, the central library will be open 24/7 to support students during the exam period.',
        author: 'Library Services',
        date: '2025-12-27',
        isGlobal: true,
        authorId: 'admin-02',
        comments: [],
    },
    {
        id: '3',
        title: 'Software Engineering Project Phase 1',
        content: 'Please submit your group members and project topics by Friday. This is mandatory for CS 3rd Year students.',
        author: 'Aisha Hassan (Delegate)',
        date: '2025-12-29',
        isGlobal: false,
        department: 'Computer Science',
        level: '3rd Year',
        authorId: '20230999',
        comments: [],
    },
    {
        id: '4',
        title: 'Advanced Algorithms Quiz',
        content: 'There will be a surprise-ish quiz this Thursday covering Graph theory. Be prepared.',
        author: 'Dr. Elena Vance',
        date: '2025-12-30',
        isGlobal: false,
        department: 'Computer Science',
        level: '3rd Year',
        authorId: 'TCH-007',
        comments: [],
    },
];

export const MOCK_STUDENTS = [
    { id: '20230889', name: 'Abdifah Ahmed', department: 'Computer Science', level: '3rd Year', attendance: 0.92, grade: 'A-' },
    { id: '20230999', name: 'Aisha Hassan', department: 'Computer Science', level: '3rd Year', attendance: 0.98, grade: 'A' },
    { id: '20230442', name: 'Med Omar', department: 'Computer Science', level: '3rd Year', attendance: 0.85, grade: 'B+' },
    { id: '20230115', name: 'Fatima Ali', department: 'Computer Science', level: '3rd Year', attendance: 0.95, grade: 'A' },
    { id: '20230773', name: 'Hassan Mohamed', department: 'Computer Science', level: '3rd Year', attendance: 0.70, grade: 'B' },
];

export const MOCK_RESOURCES = [
    {
        id: 'r1',
        title: 'Lecture 01: Introduction to React Native',
        type: 'pdf',
        size: '2.4 MB',
        category: 'Lecture Notes',
        date: '2025-12-01'
    },
    {
        id: 'r2',
        title: 'Project Requirements Template',
        type: 'docx',
        size: '1.1 MB',
        category: 'Assignments',
        date: '2025-12-05'
    },
    {
        id: 'r3',
        title: 'Graph Theory Recap Slides',
        type: 'pptx',
        size: '5.8 MB',
        category: 'Lecture Notes',
        date: '2025-12-15'
    },
    {
        id: 'r4',
        title: 'Midterm Exam Solution Key',
        type: 'pdf',
        size: '1.5 MB',
        category: 'Exams',
        date: '2025-12-20'
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
    {
        id: 'g3',
        name: 'SE Department Faculty',
        description: 'Private group for SE Department Staff.',
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
        { id: 't8', subject: 'AI Foundations', time: '14:00 - 16:00', room: 'Room 405' },
    ],
    Wednesday: [
        { id: 't4', subject: 'Cloud Computing', time: '09:00 - 11:00', room: 'Hall B' },
        { id: 't5', subject: 'Machine Learning', time: '14:00 - 16:00', room: 'Lab 2' },
    ],
    Thursday: [
        { id: 't6', subject: 'Network Security', time: '11:00 - 13:00', room: 'Room 101' },
        { id: 't9', subject: 'Mobile App Dev', time: '15:00 - 17:00', room: 'Lab 3' },
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

export const MOCK_EXAM_CALENDAR = [
    {
        id: 'e1',
        course: 'Operating Systems',
        examType: 'Midterm',
        date: '2025-01-15',
        time: '09:00 - 11:00',
        room: 'Hall A',
        duration: '2 hours',
        status: 'upcoming',
    },
    {
        id: 'e2',
        course: 'Computer Networks',
        examType: 'Midterm',
        date: '2025-01-17',
        time: '14:00 - 16:00',
        room: 'Hall B',
        duration: '2 hours',
        status: 'upcoming',
    },
    {
        id: 'e3',
        course: 'Database Systems',
        examType: 'Final',
        date: '2025-02-10',
        time: '09:00 - 12:00',
        room: 'Hall C',
        duration: '3 hours',
        status: 'upcoming',
    },
    {
        id: 'e4',
        course: 'Web Development',
        examType: 'Final',
        date: '2025-02-12',
        time: '13:00 - 16:00',
        room: 'Lab 1',
        duration: '3 hours',
        status: 'upcoming',
    },
    {
        id: 'e5',
        course: 'Data Structures',
        examType: 'Midterm',
        date: '2024-12-10',
        time: '10:00 - 12:00',
        room: 'Hall A',
        duration: '2 hours',
        status: 'completed',
    },
];

export const MOCK_EXAM_RESULTS = [
    {
        id: 'er1',
        course: 'Data Structures',
        examType: 'Midterm',
        date: '2024-12-10',
        score: 85,
        maxScore: 100,
        grade: 'B+',
        status: 'passed',
    },
    {
        id: 'er2',
        course: 'Discrete Math',
        examType: 'Final',
        date: '2024-11-20',
        score: 92,
        maxScore: 100,
        grade: 'A',
        status: 'passed',
    },
    {
        id: 'er3',
        course: 'OOP',
        examType: 'Final',
        date: '2024-11-25',
        score: 88,
        maxScore: 100,
        grade: 'A-',
        status: 'passed',
    },
    {
        id: 'er4',
        course: 'Operating Systems',
        examType: 'Quiz 1',
        date: '2024-10-15',
        score: 78,
        maxScore: 100,
        grade: 'C+',
        status: 'passed',
    },
];

export const MOCK_ACADEMIC_STATUS = {
    studentId: '20230889',
    name: 'Abdifah Ahmed',
    department: 'Computer Science',
    level: '3rd Year',
    currentSemester: 'Semester 5',
    totalCredits: 120,
    completedCredits: 96,
    gpa: 3.8,
    cgpa: 3.7,
    status: 'Active',
    enrollmentDate: '2022-09-01',
    expectedGraduation: '2026-06-30',
    academicStanding: 'Good Standing',
    warnings: 0,
    probation: false,
};
