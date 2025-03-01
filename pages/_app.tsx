import '../css/style.scss';
import {Box, ChakraProvider} from "@chakra-ui/react";
import theme from "../helpers/Theme";
import Clock from "../components/Clock";

function MyApp({Component, pageProps}) {
    return <ChakraProvider theme={theme}>
        <Box as={"header"} p={2}>
            <Clock/>
        </Box>
        <Box as={'main'} p={2}>
            <Component {...pageProps} />
        </Box>
    </ChakraProvider>;
}

export default MyApp;