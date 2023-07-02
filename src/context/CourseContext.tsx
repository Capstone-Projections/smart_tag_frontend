import React, { createContext, useState } from 'react';

interface CourseContextData {
    idcourse: string;
    setIdCourse: (idcourse: string) => void;
}

export const CourseContext = createContext<CourseContextData>({
    idcourse: '',
    setIdCourse: () => {},
});

interface CourseProviderProps {
    children: React.ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
    const [idcourse, setIdCourse] = useState('');

    const handleSetIdCourse = (idcourse: string) => {
        setIdCourse(idcourse);
    };

    return (
        <CourseContext.Provider
            value={{
                idcourse,
                setIdCourse: handleSetIdCourse,
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};
