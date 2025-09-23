import EventContext, { StadiumType } from "@/context/EventContext";
import PlayerContext from "@/context/PlayersContext";
import UserContext from "@/context/UserContext";
import useAlert from "@/hooks/useAlert";
import useApiEvent from "@/hooks/useApiEvent";
import CardNewEvent from "@/ui/cards/CardNewEvent";
import CardPlayers from "@/ui/cards/CardPlayers";
import { Save } from "@mui/icons-material";
import { Alert, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
const Event = () => {
    const [date, setDate] = useState("");
    const [stadium, setStadium] = useState<StadiumType>({ id: 0, name: "", address: "" });
    const [codeEvent, setCodeEvent] = useState("");
    //Utilizar las propiedades e métodos para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //Utilizar los métodos e propiedades del contexto
    const { user } = useContext(UserContext);
    const { players, removeAll } = useContext(PlayerContext);
    const { removeEvent } = useContext(EventContext);
    //Utilizar propiedades e métodos del hook
    const url = "https://saf5-api.onrender.com/api/event";
    const { loadingEvent, errorEvent, postEvent } = useApiEvent(url);
    //Métodos para almacenar el estado
    const handleSetDate = (d: string) => {
        if (d.trim() !== "") {
            setDate(d);
        };
    };
    const handleSetStadium = (s: StadiumType) => {
        if (s.name.trim() !== "" && s.address.trim() !== "") {
            setStadium(s);
        };
    };
    const handleChangeCodigo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCodeEvent(e.target.value);
    };
    //Método para crear el evento
    const handleSendEvent = async () => {
        await postEvent({ code: codeEvent, date, stadium, players, userId: user.id });
        handleShowAlert();
        if (!errorEvent.errorValue) {
            handleSetTimeOut();
            setDate("");
            setStadium({ id: 0, name: "", address: "" });
            removeAll();
        };
    };
    return (
        <>
            <CardNewEvent date={date} setDate={handleSetDate} stadium={stadium} addStadium={handleSetStadium} />
            <CardPlayers />
            <Typography variant="h6">{date}</Typography>
            <Typography variant="h6">{stadium.name + '' + stadium.address}</Typography>
            <TextField label="Nombre, codigo o alias del evento." variant="outlined" value={codeEvent} onChange={handleChangeCodigo}></TextField>
            {(players.length > 0) && (date.trim() !== "") && (stadium.name.trim() !== "") && (stadium.address.trim() !== "") && (codeEvent.trim() !== "") ? <Button variant="contained" onClick={handleSendEvent} color="success"><Save /></Button> : null}
            {loadingEvent ? <Alert variant="filled" severity="info">Cargando ...</Alert> : null}
            {alert && !loadingEvent && errorEvent.errorValue ? <Alert variant="filled" severity="warning">{errorEvent.message}</Alert> : null}
            {alert && !loadingEvent && !errorEvent.errorValue ? <Alert variant="filled" severity="success" >Guardado</Alert> : null}
        </>
    );
}
export default Event;