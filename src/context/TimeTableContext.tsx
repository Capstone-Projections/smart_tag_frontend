import React, { createContext, useState } from 'react';

interface TimetableDaysContextData {
    days: string[];
    setDays: (days: string[]) => void;
}

export const TimetableDaysContext = createContext<TimetableDaysContextData>({
    days: [],
    setDays: () => {},
});

interface TimetableDaysProviderProps {
    children: React.ReactNode;
}

export const TimetableDaysProvider: React.FC<TimetableDaysProviderProps> = ({
    children,
}) => {
    const [days, setDays] = useState<string[]>([]);

    return (
        <TimetableDaysContext.Provider value={{ days, setDays }}>
            {children}
        </TimetableDaysContext.Provider>
    );
};
