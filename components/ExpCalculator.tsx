import {FormEvent, useCallback, useState} from "react";
import LevelChart from "../helpers/LevelChart";
import {
    Box, Button, Grid, Heading, Icon, Text
} from "@chakra-ui/react";
import {FaCalculator} from "react-icons/fa";

import {
    NumberInputField,
    NumberInputLabel,
    NumberInputRoot,
} from "../src/components/ui/number-input";

interface ResultCalc {
    quantity: number
}

interface FormDataCalc {
    [k: string]: number;

    cur_lvl?: number;
    target_lvl?: number;
    cur_exp?: number;
    item_exp?: number;
}

export default function ExpCalculator() {
    const [result, setResult] = useState({quantity: 0} as ResultCalc);

    const handleSubmit = useCallback((ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const formData = new FormData(ev.target as HTMLFormElement);
        let formDataEntries = Object.fromEntries(formData);
        const data: FormDataCalc = Object.fromEntries(
            Object.entries(formDataEntries)
                .map(([k, v]: [string, string]) => [k, parseInt(v)])
        );
        const {cur_lvl, target_lvl, cur_exp, item_exp} = data;
        const lvlDiff = LevelChart.getExpBetween(cur_lvl, target_lvl);
        const quantity = Math.ceil((lvlDiff - Math.min(cur_exp, lvlDiff)) / item_exp);
        setResult({quantity});
    }, [setResult]);

    return <Box asChild maxW="min(100%, 720px)" m={"0 auto"} py={4}>
        <form onSubmit={handleSubmit}>
            <Heading mb={2}><Icon as={FaCalculator}/> Exp Calculator</Heading>
            <Grid gap={4} mb={4} templateColumns={['1fr', '1fr 1fr']}>
                <NumberInputRoot name="cur_lvl"
                                 min={LevelChart.MIN} max={LevelChart.MAX - 1}
                                 defaultValue={LevelChart.MIN}>
                    <NumberInputLabel>Current Level</NumberInputLabel>
                    <NumberInputField/>
                </NumberInputRoot>
                <NumberInputRoot name="target_lvl"
                                 min={LevelChart.MIN + 1} max={LevelChart.MAX}
                                 defaultValue={LevelChart.MAX}>
                    <NumberInputLabel>Target Level</NumberInputLabel>
                    <NumberInputField/>
                </NumberInputRoot>
                <NumberInputRoot name="cur_exp" min={0} defaultValue={0}>
                    <NumberInputLabel>Current EXP</NumberInputLabel>
                    <NumberInputField/>
                </NumberInputRoot>
                <NumberInputRoot name="item_exp" min={1} defaultValue={1}>
                    <NumberInputLabel>Item EXP</NumberInputLabel>
                    <NumberInputField/>
                </NumberInputRoot>
                <Button type="submit">Calcular</Button>
            </Grid>
            <hr/>
            <Text fontSize="xl" my={2}>Item Quantity: <small>{result.quantity}</small></Text>
        </form>
    </Box>;
}