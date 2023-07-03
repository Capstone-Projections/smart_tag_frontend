export function isTimeBetween(
    time: string,
    startTime: string,
    endTime: string
): boolean {
    return time >= startTime && time <= endTime;
}
