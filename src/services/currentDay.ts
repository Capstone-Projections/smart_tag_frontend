function getCurrentDay(): string {
    const daysOfWeek: string[] = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const currentDate: Date = new Date();
    const currentDayIndex: number = currentDate.getDay();
    const currentDay: string = daysOfWeek[currentDayIndex];
    return currentDay;
}

export default getCurrentDay;
