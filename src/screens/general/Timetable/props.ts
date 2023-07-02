export interface TimetableProps {
    navigation: any;
}

export interface ReturnProps {
    idlesson: string;
    startTime: string;
    endTime: string;
    day: string;
    lectureRoom_idlectureRoom: number;
    lectureroom: LectureRoom;
}

interface LectureRoom {
    idLectureRoom: string;
    name: string;
    roomLocation: string;
    uid: string;
}
