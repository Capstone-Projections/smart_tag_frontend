import { ReturnProps } from '../screens/general/Timetable/props';
import getCurrentDay from './currentDay';
import { getCurrentTime } from './getCurrentTime';
import { isTimeBetween } from './timeIsBetween';

export function getLectureRoomUidByDayAndTime(
    lessons: ReturnProps[]
): string | undefined {
    const currentDay: string = getCurrentDay();
    const currentTime: string = getCurrentTime();

    const lesson = lessons.find(lesson => lesson.day === currentDay);

    if (lesson && lesson.lectureroom) {
        const lessonStartTime = lesson.startTime;
        const lessonEndTime = lesson.endTime;

        if (isTimeBetween(currentTime, lessonStartTime, lessonEndTime)) {
            // console.log(lesson.lectureroom.uid);
            return lesson.lectureroom.uid;
        }
    }

    return undefined;
}
