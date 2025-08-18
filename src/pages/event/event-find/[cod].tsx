import ListDataEvent from "@/ui/lists/ListDataEvent";
import { useRouter } from "next/router";

export default function EventFind() {
    const route = useRouter();
    const codigoEvent = route.query.cod;

    return (
        <>
            <ListDataEvent codigoParams={codigoEvent} />
        </>
    );
};