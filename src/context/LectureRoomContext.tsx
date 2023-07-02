import React, { createContext, useState } from 'react';

interface LessonRoomContextData {
    lessonRoomId: string;
    setLessonRoomId: (lessonRoomId: string) => void;
}

export const LessonRoomContext = createContext<LessonRoomContextData>({
    lessonRoomId: '',
    setLessonRoomId: () => {},
});

interface LessonRoomProviderProps {
    children: React.ReactNode;
}

export const LessonRoomProvider: React.FC<LessonRoomProviderProps> = ({
    children,
}) => {
    const [lessonRoomId, setLessonRoomId] = useState('');

    const handleSetLessonRoomId = (id: string) => {
        setLessonRoomId(id);
    };

    return (
        <LessonRoomContext.Provider
            value={{
                lessonRoomId,
                setLessonRoomId: handleSetLessonRoomId,
            }}
        >
            {children}
        </LessonRoomContext.Provider>
    );
};
