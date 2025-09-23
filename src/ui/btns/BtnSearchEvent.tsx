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
    const [search, setSearch] = useState(false);
    //propiedades e método de los contextos
    const { addEvent, addStadium, addPlayers } = useContext(EventContext);
    const handleClick = () => {
        setSearch(true);
        //Evaluar si hay data en el contexto
        if (event.id > 0) {
            removeEvent();
            setSearch(false);
        }
    };
    useEffect(() => {
        if (code.trim() !== "" && search) {
            handleShowAlert();
            getEventByCode(code);
            if (dataEvent.statusCode == 200) {
                addEvent({ id: dataEvent.info.id, code: dataEvent.info.code, date: dataEvent.info.date, Stadium: dataEvent.info.Stadium, Player: dataEvent.info.Players });
                addPlayers(dataEvent.info.Players);
                addStadium({ id: dataEvent.info.Stadium.id, name: dataEvent.info.Stadium.name, address: dataEvent.info.Stadium.address });
            };
            handleSetTimeOut();
        };
    }, [search])
    return (
        <>
            <Button variant="contained" onClick={handleClick}><Search /></Button>
            {alert && loadingEvent ? <Typography>Cargando ...</Typography> : null}
        </>
    )
}
export default BtnSearchEvent;