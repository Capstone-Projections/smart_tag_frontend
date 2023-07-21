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
    getStarted: string;
    setGetStarted: (getStarted: string) => void;
    firstNameData: string;
    setFirstNameData: (firstName: string) => void;
    lastNameData: string;
    setLastNameData: (lastName: string) => void;
    lecturerFirstName: string;
    setLecturerFirstName: (lecturerFirstName: string) => void;
    lecturerLastName: string;
    setLecturerLastName: (lecturerLastName: string) => void;
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
    getStarted: '',
    setGetStarted: () => {},
    firstNameData: '',
    setFirstNameData: () => {},
    lastNameData: '',
    setLastNameData: () => {},
    lecturerFirstName: '',
    setLecturerFirstName: () => {},
    lecturerLastName: '',
    setLecturerLastName: () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');
    const [userID, setUserID] = useState('');
    const [authorizationKey, setAuthorizationKey] = useState('');
    const [firstNameData, setFirstNameData] = useState('');
    const [getStarted, setGetStarted] = useState('');
    const [lastNameData, setLastNameData] = useState('');
    const [lecturerFirstName, setLecturerFirstName] = useState('');
    const [lecturerLastName, setLecturerLastName] = useState('');

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

    const handleSetGetStarted = (getStarted: string) => {
        setGetStarted(getStarted);
    };

    const handleSetFirstNameData = (firstNameData: string) => {
        setFirstNameData(firstNameData);
    };

    const handleSetLastNameData = (lastNameData: string) => {
        setLastNameData(lastNameData);
    };

    const handleSetLecturerFirstName = (lecturerFirstName: string) => {
        setLecturerFirstName(lecturerFirstName);
    };

    const handleSetLecturerLastName = (lecturerLastName: string) => {
        setLecturerLastName(lecturerLastName);
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

        getStarted,
        setGetStarted: handleSetGetStarted,
        firstNameData,
        setFirstNameData: handleSetFirstNameData,
        lastNameData,
        setLastNameData: handleSetLastNameData,
        lecturerFirstName,
        setLecturerFirstName: handleSetLecturerFirstName,
        lecturerLastName,
        setLecturerLastName: handleSetLecturerLastName,
    };

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};
