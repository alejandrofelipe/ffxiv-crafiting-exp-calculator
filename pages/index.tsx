import {Button, Flex, Link} from "@chakra-ui/react";
import {FaCalculator, FaTerminal} from "react-icons/fa";

export default function Home() {
    return <Flex gap={2} direction={['column', 'row']}
                 flexWrap="nowrap" justifyContent="center">
        <Button as={Link} colorScheme='blue' href="/exp-calculator"
                leftIcon={<FaCalculator/>}>
            Exp Calculator
        </Button>
        <Button as={Link} colorScheme='green' href="/macro-builder"
                leftIcon={<FaTerminal/>}>
            Macro Builder
        </Button>
    </Flex>;
}