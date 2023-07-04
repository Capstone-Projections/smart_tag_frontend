import React, { createContext, useState } from 'react';

interface CourseContextData {
    IDcourse: string;
    setIdCourse: (IDcourse: string) => void;
    courseTitle: string;
    setCourseTitle: (courseTitle: string) => void;
}

export const CourseContext = createContext<CourseContextData>({
    IDcourse: '',
    setIdCourse: () => {},
    courseTitle: '',
    setCourseTitle: () => {},
});

interface CourseProviderProps {
    children: React.ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
    const [IDcourse, setIdCourse] = useState('');
    const [courseTitle, setCourseTitle] = useState('');

    const handleSetIdCourse = (IDcourse: string) => {
        setIdCourse(IDcourse);
    };

    const handleSetCourseTitle = (courseTitle: string) => {
        setCourseTitle(courseTitle);
    };

    return (
        <CourseContext.Provider
            value={{
                IDcourse,
                setIdCourse: handleSetIdCourse,
                courseTitle,
                setCourseTitle: handleSetCourseTitle,
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};
