//this function is to parse the return after hitting the lesson route and then put in some format that can be displayed on the timetable component

import { ReturnProps } from '../screens/general/Timetable/props';

export const transformLessonData = (lessons: ReturnProps[]) => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const days: string[] = [];
    const timeRanges: string[] = [];

    lessons.forEach(lesson => {
        const { day, startTime, endTime } = lesson;
        const dayIndex = daysOfWeek.indexOf(day);
        const timeRange = `${startTime}-${endTime}`;

        if (dayIndex !== -1 && !days.includes(day)) {
            days.push(day);
        }

        if (!timeRanges.includes(timeRange)) {
            timeRanges.push(timeRange);
        }
    });

    return { days, timeRanges };
};
