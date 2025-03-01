import {Button, ButtonProps} from "@chakra-ui/react";
import {useRouter} from "next/navigation";
import {RefAttributes} from "react";

export default function ButtonLink(props: ButtonProps & RefAttributes<HTMLButtonElement> & { href: string }) {
    const router = useRouter();
    const {href, ...btnProps} = props;

    return <Button {...btnProps} onClick={() => router.push(href)}/>
}