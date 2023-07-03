export function getCurrentTime(): string {
    const now: Date = new Date();
    const hours: number = now.getHours();
    const minutes: number = now.getMinutes();

    const formattedTime: string = `${padZero(hours)}:${padZero(minutes)}`;
    return formattedTime;
}

function padZero(num: number): string {
    return num.toString().padStart(2, '0');
}

// Output: 12:34 (current time)
