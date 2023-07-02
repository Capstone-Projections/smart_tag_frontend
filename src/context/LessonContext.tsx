import React, { createContext, useState } from 'react';

//create a lesson version of the ContextContext but this time use idlesson and setIdLesson

interface LessonContextData {
    idlesson: string;
    setIdLesson: (idlesson: string) => void;
}

export const LessonContext = createContext<LessonContextData>({
    idlesson: '',
    setIdLesson: () => {},
});

interface LessonProviderProps {
    children: React.ReactNode;
}

export const LessonProvider: React.FC<LessonProviderProps> = ({ children }) => {
    const [idlesson, setIdLesson] = useState('');

    const handleSetIdLesson = (idlesson: string) => {
        setIdLesson(idlesson);
    };

    return (
        <LessonContext.Provider
            value={{
                idlesson,
                setIdLesson: handleSetIdLesson,
            }}
        >
            {children}
        </LessonContext.Provider>
    );
};
