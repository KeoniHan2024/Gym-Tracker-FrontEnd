export function convertToSeconds(hours: string, minutes: string, seconds:string): string {

    return String(Number(hours)*3600 +Number(minutes)*60 + Number(seconds))
}

function convertToHHMMSS(totalSeconds:number ){
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
}