import EventContext from "@/context/EventContext";
import useApi from "@/hooks/useApi";
import ListDataEvent from "@/ui/lists/ListDataEvent";
import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function EventFind() {
    const route = useRouter();
    let url = "http://localhost:5000/api/event";
    const { dataInfo, loading, error, getEventByCodigo } = useApi(url);
    const codigoEvent = route.query.cod;
    const { addEvent, addStadium, addPlayers } = useContext(EventContext);

    useEffect(() => {
        if (codigoEvent == undefined) {
            console.log(error);
        } else {
            getEventByCodigo(codigoEvent.toString());
        }
    }, [url]);

    if (dataInfo.length !== 0) {
        dataInfo.forEach((elem) => {
            console.log(elem);
        })
    };

    return (
        <>
            <h3>Event find page</h3>
            {loading ? <Alert variant="filled" severity="info">Cargando ...</Alert> : null}
            {dataInfo.length == 0 ? <Alert variant="filled" severity="info">No hay datos {error.message}</Alert> : null}
        </>
    );
};