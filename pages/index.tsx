import {Flex} from "@chakra-ui/react";
import ButtonLink from "../components/ButtonLink";

export default function Home() {
    return <Flex gap={2} direction={['column', 'row']}
                 flexWrap="nowrap" justifyContent="center">
        <ButtonLink href="/exp-calculator">Exp Calculator</ButtonLink>
        <ButtonLink href="/macro-builder">Macro Builder</ButtonLink>
    </Flex>;
}