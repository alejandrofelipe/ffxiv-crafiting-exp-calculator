import {useEffect, useState} from "react";
import {Box} from "@chakra-ui/react";
import {convertToEorzeaTimeString} from "../helpers/TimeObject";

export default function Clock() {
    const [time, setTime] = useState("-");
    const [eorzeaTime, setEorzeaTime] = useState("-")

    useEffect(() => {
        const intervalNumber = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString());
            setEorzeaTime(convertToEorzeaTimeString(now, "%H:%I"));
        }, 1000);

        return () => clearInterval(intervalNumber);
    }, [])

    return <Box display="flex" flexDirection="row" justifyContent="center" gap={2}>
        <DisplayClock time={time} prefix="LT"/>
        <DisplayClock time={eorzeaTime} prefix="ET"/>
    </Box>;
}

export function DisplayClock({prefix, time}: { time: string, prefix?: string }) {
    return <Box p={2} backgroundColor="white" borderRadius={10} border="1px solid" borderColor="gray.200" color="black">
        {prefix} {time}
    </Box>;
}