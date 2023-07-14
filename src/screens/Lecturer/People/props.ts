export interface User {
    id: number;
    firstName: string;
    lastName: string;
}

export interface PeopleProps {
    navigation: any;
}

export interface QuestUsers {
    iduser: number;
    firstName: string;
    middleName: string | null;
    lastName: string;
    doubtPoints: number;
    attendance: {
        idattendance: number;
    }[];
}
