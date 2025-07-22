import EventContext from "@/context/EventContext";
import { useContext } from "react";

export default function ListDataEvent() {
    const { event } = useContext(EventContext)
    return (
        <>
            <ul>
                <li>{event.date}</li>
                <li>{event.codigo}</li>
            </ul>
        </>
    )
}