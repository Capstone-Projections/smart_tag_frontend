import React, { createContext, useState } from 'react';

interface AuthContextData {
    userType: string;
    setUserType: (userType: string) => void;
    email: string;
    setEmail: (email: string) => void;
    userID: string;
    setUserID: (userID: string) => void;
    authorizationKey: string;
    setAuthorizationKey: (authorizationKey: string) => void;
    courseTitle: string;
    setCourseTitle: (courseTitle: string) => void;
    getStarted: string;
    setGetStarted: (getStarted: string) => void;
}

export const AuthContext = createContext<AuthContextData>({
    userType: '',
    setUserType: () => {},
    email: '',
    setEmail: () => {},
    userID: '',
    setUserID: () => {},
    authorizationKey: '',
    setAuthorizationKey: () => {},
    courseTitle: '',
    setCourseTitle: () => {},
    getStarted: '',
    setGetStarted: () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');
    const [userID, setUserID] = useState('');
    const [authorizationKey, setAuthorizationKey] = useState('');
    const [courseTitle, setCourseTitle] = useState('');
    const [getStarted, setGetStarted] = useState('');

    const handleSetUserType = (userType: string) => {
        setUserType(userType);
    };

    const handleSetEmail = (email: string) => {
        setEmail(email);
    };

    const handleSetUserID = (userID: string) => {
        setUserID(userID);
    };

    const handleSetAuthorizationKey = (authorizationKey: string) => {
        setAuthorizationKey(authorizationKey);
    };

    const handleSetCourseTitle = (courseTitle: string) => {
        setCourseTitle(courseTitle);
    };

    const handleSetGetStarted = (getStarted: string) => {
        setGetStarted(getStarted);
    };

    const authContextData: AuthContextData = {
        userType,
        setUserType: handleSetUserType,
        email,
        setEmail: handleSetEmail,
        userID,
        setUserID: handleSetUserID,
        authorizationKey,
        setAuthorizationKey: handleSetAuthorizationKey,
        courseTitle,
        setCourseTitle: handleSetCourseTitle,
        getStarted,
        setGetStarted: handleSetGetStarted,
    };

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};
