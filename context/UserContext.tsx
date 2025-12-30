import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'student' | 'delegate' | 'admin';

interface User {
    id: string;
    name: string;
    role: UserRole;
    department?: string;
    level?: string;
    staffId?: string;
    title?: string;
}

interface UserContextType {
    user: User | null;
    setRole: (role: UserRole) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const setRole = (role: UserRole) => {
        if (role === 'admin') {
            setUser({
                id: 'ADM-001',
                name: 'Dean Arthur Morgan',
                role: 'admin',
                staffId: 'STAFF-12345',
                title: 'University Dean',
            });
        } else if (role === 'delegate') {
            setUser({
                id: 'PRF-DLG-789',
                name: 'Prof. Sarah Johnson (Delegate)',
                role: 'delegate',
                department: 'Software Engineering',
                level: 'Faculty Level',
                staffId: 'DLG-98765',
                title: 'Professor Assistant / Delegate',
            });
        } else {
            setUser({
                id: '20230889',
                name: 'John Doe',
                role: 'student',
                department: 'Computer Science',
                level: '3rd Year',
                title: 'Student',
            });
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setRole, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};
