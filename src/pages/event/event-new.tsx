import { StadiumType } from "@/context/EventContext";
import PlayerContext from "@/context/PlayersContext";
import UserContext from "@/context/UserContext";
import useAlert from "@/hooks/useAlert";
import useApiEvent from "@/hooks/useApiEvent";
import CardNewEvent from "@/ui/cards/CardNewEvent";
import CardPlayers from "@/ui/cards/CardPlayers";
import { Save } from "@mui/icons-material";
import { Alert, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
export default function Event() {
    const [date, setDate] = useState("");
    const [stadium, setStadium] = useState<StadiumType>({ id: 0, name: "", address: "" });
    const [codigo, setCodigo] = useState("");
    //Utilizar las propiedades e métodos para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //Utilizar los métodos e propiedades del contexto
    const { user } = useContext(UserContext);
    const { players, removeAll } = useContext(PlayerContext);
    //Utilizar propiedades e métodos del hook
    const url = "http://localhost:5000/api/event";
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
        if (e.target.value.trim() !== "") {
            setCodigo(e.target.value.trim());
        };
    };
    //Método para crear el evento
    const handleSendEvent = () => {
        postEvent({ codigo, date, stadium, players, userId: user.id });
        handleShowAlert();
        if (!errorEvent.errorValue) {
            handleSetTimeOut();
            setDate("");
            setStadium({ id: 0, name: "", address: "" });
            removeAll();
        };
    };
    console.log(user);
    return (
        <>
            <CardNewEvent date={date} setDate={handleSetDate} stadium={stadium} addStadium={handleSetStadium} />
            <CardPlayers />
            <Typography variant="h6">{date}</Typography>
            <Typography variant="h6">{stadium.name + '' + stadium.address}</Typography>
            <TextField label="Nombre, codigo o alias del evento." variant="outlined" value={codigo} onChange={handleChangeCodigo}></TextField>
            {(players.length !== 0) && (date !== "") && (stadium.name !== "") && (stadium.address !== "") && (codigo !== "") ? <Button variant="contained" onClick={handleSendEvent} color="success"><Save /></Button> : null}
            {loadingEvent ? <Alert variant="filled" severity="info">Cargando ...</Alert> : null}
            {!loadingEvent && errorEvent.errorValue ? <Alert variant="filled" severity="warning">{errorEvent.message}</Alert> : null}
            {alert && !loadingEvent && !errorEvent.errorValue ? <Alert variant="filled" severity="success" >Guardado</Alert> : null}
        </>
    );
}