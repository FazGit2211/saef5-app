import ListDataEvent from "@/ui/lists/ListDataEvent";
import { useRouter } from "next/router";

export default function EventFind() {
    const route = useRouter();
    const codeEvent = route.query.cod;

    return (
        <>
            <ListDataEvent codeParams={codeEvent} />
        </>
    );
};