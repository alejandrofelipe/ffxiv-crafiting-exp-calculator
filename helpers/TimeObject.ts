const YEAR = 33177600;
const MONTH = 2764800;
const DAY = 86400;
const HOUR = 3600;
const MINUTE = 60;
const SECOND = 1;

const EORZEA_TIME_CONSTANT = 3600 / 175;

class EorzeaTime {
    constructor(
        private readonly year: number,
        private readonly month: number,
        private readonly day: number,
        private readonly hour: number,
        private readonly minute: number,
        private readonly second: number
    ) {
    }
}

export function convertToEorzeaTime(date) {
    const earthTime = date.getTime() / 1000; // Converte para segundos
    const eorzeaTime = Math.floor(earthTime * EORZEA_TIME_CONSTANT);

    const year = Math.floor(eorzeaTime / YEAR) + 1;
    const month = Math.floor((eorzeaTime / MONTH) % 12) + 1;
    const day = Math.floor((eorzeaTime / DAY) % 32) + 1;
    const hour = Math.floor((eorzeaTime / HOUR) % 24);
    const minute = Math.floor((eorzeaTime / MINUTE) % 60);
    const second = Math.floor((eorzeaTime / SECOND) % 60);

    return new EorzeaTime(year, month, day, hour, minute, second);
}

export function convertToEorzeaTimeString(date, format) {
    const earthTime = date.getTime() / 1000; // Converte para segundos
    const eorzeaTime = Math.floor(earthTime * EORZEA_TIME_CONSTANT);

    const year = `${Math.floor(eorzeaTime / YEAR) + 1}`;
    const month = formatZero(Math.floor((eorzeaTime / MONTH) % 12) + 1);
    const day = formatZero(Math.floor((eorzeaTime / DAY) % 32) + 1);
    const hour = formatZero(Math.floor((eorzeaTime / HOUR) % 24));
    const minute = formatZero(Math.floor((eorzeaTime / MINUTE) % 60));
    const second = formatZero(Math.floor((eorzeaTime / SECOND) % 60));

    return format
        .replace("%Y", year)
        .replace("%M", month)
        .replace("%D", day)
        .replace("%H", hour)
        .replace("%I", minute)
        .replace("%S", second);
}

function parseEorzeaTimeString(timeString, format) {
    const formatRegex = format
        .replace("%Y", "(\\d+)")
        .replace("%M", "(\\d+)")
        .replace("%D", "(\\d+)")
        .replace("%H", "(\\d+)")
        .replace("%I", "(\\d+)")
        .replace("%S", "(\\d+)");
    const match = timeString.match(new RegExp(formatRegex));

    if (!match) {
        throw new Error("Invalid time string format");
    }

    return {
        year: parseInt(match[1], 10),
        month: parseInt(match[2], 10),
        day: parseInt(match[3], 10),
        hour: parseInt(match[4], 10),
        minute: parseInt(match[5], 10),
        second: parseInt(match[6], 10),
    };
}

function convertToEarthTime(timeString, format) {
    const parsed = parseEorzeaTimeString(timeString, format);

    const { year, month, day, hour, minute, second } = parsed;

    const totalEorzeaSeconds =
        (year - 1) * YEAR +
        (month - 1) * MONTH +
        (day - 1) * DAY +
        hour * HOUR +
        minute * MINUTE +
        second;

    const earthSeconds = Math.floor(totalEorzeaSeconds / EORZEA_TIME_CONSTANT);

    return new Date(earthSeconds * 1000);
}

function formatZero(value) {
    return value.toString().padStart(2, "0");
}