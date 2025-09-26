import EventContext from "@/context/EventContext";
import SearchContext from "@/context/SearchContext";
import useAlert from "@/hooks/useAlert";
import useApiEvent from "@/hooks/useApiEvent";
import { Search } from "@mui/icons-material";
import { Button, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";

const BtnSearchEvent = () => {
    //Utilizar hook personalizado alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //url para poder realizar la petición hacia la api
    const urlEvent = "http://localhost:5000/api/event";
    //propiedades del hook personalizado con información del estado de la petición
    const { loadingEvent, getEventByCode, dataEvent } = useApiEvent(urlEvent);
    const { code } = useContext(SearchContext);
    const { event, removeEvent } = useContext(EventContext);
    //Estado para manejar cuando se quiere buscar un nuevo evento
    //propiedades e método de los contextos
    const { addEvent, addStadium, addPlayers } = useContext(EventContext);
    const handleClick = async () => {
        handleShowAlert();
        await getEventByCode(code);
        //Evaluar si hay data en el contexto e limpiar para nueva búsqueda
        if (event.id > 0) {
            removeEvent();
        }
        handleSetTimeOut();
    };
    useEffect(() => {
        if (dataEvent.statusCode == 200) {
            addEvent({ id: dataEvent.info.id, code: dataEvent.info.code, date: dataEvent.info.date, Stadium: dataEvent.info.Stadium, Player: dataEvent.info.Players });
            addPlayers(dataEvent.info.Players);
            addStadium({ id: dataEvent.info.Stadium.id, name: dataEvent.info.Stadium.name, address: dataEvent.info.Stadium.address });
        };
    }, [alert])
    return (
        <>
            <Button variant="contained" onClick={handleClick}><Search /></Button>
            {alert || loadingEvent ? <Typography>Cargando ...</Typography> : null}
            {alert && !loadingEvent && dataEvent.statusCode !== 200 ? <Typography>{dataEvent.message}</Typography> : null}
        </>
    )
}
export default BtnSearchEvent;