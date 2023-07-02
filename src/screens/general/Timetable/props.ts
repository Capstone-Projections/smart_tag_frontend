export interface TimetableProps {
    navigation: any;
}

export interface ReturnProps {
    idlesson: number;
    startTime: string;
    endTime: string;
    day: string;
    lectureRoom_idlectureRoom: number;
    lectureroom: LectureRoom;
}

interface LectureRoom {
    idLectureRoom: number;
    name: string;
    roomLocation: string;
    uid: string;
}
