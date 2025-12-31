import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface Student {
    id: string;
    name: string;
    department: string;
    level: string;
    attendance: number;
    grade: string;
}

export interface CourseGrade {
    name: string;
    grade: string;
    credits: number;
}

export interface SemesterGrade {
    id: string;
    semester: string;
    gpa: string;
    courses: CourseGrade[];
}

interface GradeManagementContextType {
    students: Student[];
    grades: SemesterGrade[];
    addStudent: (student: Omit<Student, 'attendance' | 'grade'>) => void;
    addGrade: (studentId: string, course: CourseGrade) => void;
    updateStudentGrade: (studentId: string, grade: string) => void;
    deleteStudent: (studentId: string) => void;
    deleteGrade: (studentId: string, courseName: string) => void;
}

const GradeManagementContext = createContext<GradeManagementContextType | undefined>(undefined);

export const GradeManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [students, setStudents] = useState<Student[]>([
        { id: '20230889', name: 'Abdifatah Ismal', department: 'Computer Science', level: '3rd Year', attendance: 0.92, grade: '17/20' },
        { id: '20230999', name: 'Mohamed Farah', department: 'Computer Science', level: '3rd Year', attendance: 0.98, grade: '18/20' },
        { id: '20230442', name: 'Med Omar', department: 'Computer Science', level: '3rd Year', attendance: 0.85, grade: '16/20' },
        { id: '20230115', name: 'Fatima Ali', department: 'Computer Science', level: '3rd Year', attendance: 0.95, grade: '18/20' },
        { id: '20230773', name: 'Hassan Mohamed', department: 'Computer Science', level: '3rd Year', attendance: 0.70, grade: '15/20' },
    ]);

    const [grades, setGrades] = useState<SemesterGrade[]>([
        {
            id: 's1', semester: 'Semester 5', gpa: '3.8', courses: [
                { name: 'Operating Systems', grade: '18/20', credits: 4 },
                { name: 'Computer Networks', grade: '17/20', credits: 3 },
                { name: 'Human Computer Interaction', grade: '16/20', credits: 3 },
            ]
        },
        {
            id: 's2', semester: 'Semester 4', gpa: '3.6', courses: [
                { name: 'Data Structures', grade: '18/20', credits: 4 },
                { name: 'Discrete Math', grade: '15/20', credits: 3 },
                { name: 'OOP', grade: '18/20', credits: 4 },
            ]
        },
    ]);

    const addStudent = (studentData: Omit<Student, 'attendance' | 'grade'>) => {
        const newStudent: Student = {
            ...studentData,
            attendance: 0,
            grade: '0/20',
        };
        setStudents(prev => [...prev, newStudent]);
    };

    const addGrade = (studentId: string, course: CourseGrade) => {
        // Find the student's semester grades or create new entry
        // For simplicity, we'll add to the first semester
        setGrades(prev => {
            const updated = [...prev];
            if (updated.length > 0) {
                updated[0] = {
                    ...updated[0],
                    courses: [...updated[0].courses, course],
                };
            }
            return updated;
        });
    };

    const updateStudentGrade = (studentId: string, grade: string) => {
        setStudents(prev =>
            prev.map(student =>
                student.id === studentId ? { ...student, grade } : student
            )
        );
    };

    const deleteStudent = (studentId: string) => {
        setStudents(prev => prev.filter(student => student.id !== studentId));
    };

    const deleteGrade = (studentId: string, courseName: string) => {
        setGrades(prev =>
            prev.map(semester => ({
                ...semester,
                courses: semester.courses.filter(course => course.name !== courseName),
            }))
        );
    };

    return (
        <GradeManagementContext.Provider
            value={{
                students,
                grades,
                addStudent,
                addGrade,
                updateStudentGrade,
                deleteStudent,
                deleteGrade,
            }}
        >
            {children}
        </GradeManagementContext.Provider>
    );
};

export const useGradeManagement = () => {
    const context = useContext(GradeManagementContext);
    if (!context) {
        throw new Error('useGradeManagement must be used within a GradeManagementProvider');
    }
    return context;
};

