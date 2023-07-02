import React, { createContext, useState } from 'react';

interface CourseContextData {
    IDcourse: string;
    setIdCourse: (IDcourse: string) => void;
}

export const CourseContext = createContext<CourseContextData>({
    IDcourse: '',
    setIdCourse: () => {},
});

interface CourseProviderProps {
    children: React.ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
    const [IDcourse, setIdCourse] = useState('');

    const handleSetIdCourse = (IDcourse: string) => {
        setIdCourse(IDcourse);
    };

    return (
        <CourseContext.Provider
            value={{
                IDcourse,
                setIdCourse: handleSetIdCourse,
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};
