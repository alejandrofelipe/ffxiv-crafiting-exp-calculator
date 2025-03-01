import '../css/style.scss';
import {Box} from "@chakra-ui/react";
import Clock from "../components/Clock";
import {Provider} from '../src/components/ui/provider'

function MyApp({Component, pageProps}) {
    return <Provider>
        <Box as={"header"} p={2}>
            <Clock/>
        </Box>
        <Box as={'main'} p={2}>
            <Component {...pageProps} />
        </Box>
    </Provider>;
}

export default MyApp;