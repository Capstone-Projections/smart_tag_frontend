import { ReturnProps } from '../screens/general/Timetable/props';
import getCurrentDay from './currentDay';

export function getLectureRoomUidByDay(
    lessons: ReturnProps[]
): string | undefined {
    const currentDay: string = getCurrentDay();

    // Find the lesson object that matches the current day
    const lesson = lessons.find(lesson => lesson.day === currentDay);
    // console.log(lesson);
    // If a matching lesson is found, return the uid of the lecture room
    if (lesson && lesson.lectureroom) {
        console.log(lesson.lectureroom.uid);
        return lesson.lectureroom.uid;
    }

    // Return undefined if no matching lesson or lectureroom found
    return undefined;
}
