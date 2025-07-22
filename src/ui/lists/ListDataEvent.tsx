import EventContext from "@/context/EventContext";
import { useContext } from "react";

export default function ListDataEvent() {
    const { event, players } = useContext(EventContext);    
    return (
        <>
        <ul>
            <li>Fecha :{event.date}</li>
            <li>Codigo : {event.codigo}</li>
            {players.map((elem) => (<li>{elem.name}</li>))}
        </ul>
        </>
    )
}