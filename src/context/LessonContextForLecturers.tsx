import React, { createContext, useState } from 'react';

interface LessonContextDataForLecturers {
    idLessonForLecturers: string;
    setIdLessonForLecturers: (idlesson: string) => void;
}

export const LessonContextForLecturers =
    createContext<LessonContextDataForLecturers>({
        idLessonForLecturers: '',
        setIdLessonForLecturers: () => {},
    });

interface LessonProviderPropsForLecturers {
    children: React.ReactNode;
}

export const LessonProviderForLecturers: React.FC<
    LessonProviderPropsForLecturers
> = ({ children }) => {
    const [idLessonForLecturers, setIdLessonForLecturers] = useState('');

    const handleSetIdLessonForLecturers = (idlesson: string) => {
        setIdLessonForLecturers(idlesson);
    };

    return (
        <LessonContextForLecturers.Provider
            value={{
                idLessonForLecturers,
                setIdLessonForLecturers: handleSetIdLessonForLecturers,
            }}
        >
            {children}
        </LessonContextForLecturers.Provider>
    );
};
