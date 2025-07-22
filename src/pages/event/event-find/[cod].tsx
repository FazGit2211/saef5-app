import EventContext from "@/context/EventContext";
import useApi from "@/hooks/useApi";
import ListDataEvent from "@/ui/lists/ListDataEvent";
import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function EventFind() {
    const route = useRouter();
    let url = "http://localhost:5000/api/event";
    const { dataInfo, loading, error, getEventByCodigo } = useApi(url);
    const codigoEvent = route.query.cod;
    const { addEvent, addStadium, addPlayers } = useContext(EventContext);

    useEffect(() => {
        if (codigoEvent == undefined) {
            return;
        } else {
            getEventByCodigo(codigoEvent.toString());
        }
    }, [url]);

    useEffect(() => {
        if (dataInfo) {
            addEvent({ date: dataInfo.date, codigo: dataInfo.codigo })
        }
    }, [dataInfo])


    return (
        <>
            <h3>Event find page</h3>
            {loading ? <Alert variant="filled" severity="info">Cargando ...</Alert> : null}
            {dataInfo ? <Alert variant="filled" severity="info">No hay datos {error.message}</Alert> : <ListDataEvent />}
        </>
    );
};