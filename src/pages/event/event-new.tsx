import { StadiumType } from "@/context/EventContext";
import PlayerContext from "@/context/PlayersContext";
import useAlert from "@/hooks/useAlert";
import useApi from "@/hooks/useApi";
import CardNewEvent from "@/ui/cards/CardNewEvent";
import CardPlayers from "@/ui/cards/CardPlayers";
import { Save } from "@mui/icons-material";
import { Alert, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

export default function Event() {
    const [date, setDate] = useState("");
    const [stadium, setStadium] = useState<StadiumType>({ id: 0, name: "", address: "" });
    const [codigo, setCodigo] = useState("");
    //propiedades e métodos para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //Llamar al contexto
    const { players, removeAll } = useContext(PlayerContext);
    const url = "http://localhost:5000/api/event";
    const { loading, error, postEvent } = useApi(url);


    const handleSetDate = (d: string) => {
        setDate(d);
    };

    const handleSetStadium = (s: StadiumType) => {
        setStadium(s);
    };

    const handleSendEvent = () => {
        postEvent({ codigo, date, stadium, players });
        handleShowAlert();
        handleSetTimeOut();
        handleError();
    };

    const handleError = () => {
        setDate("");
        setStadium({ id: 0, name: "", address: "" });
        removeAll();
    };

    return (
        <>
            <CardNewEvent date={date} setDate={handleSetDate} stadium={stadium} addStadium={handleSetStadium} />
            <CardPlayers />
            <Card>
                <CardContent>
                    <Typography>{date}</Typography>
                    <Typography>{stadium.name + '' + stadium.address}</Typography>
                    <TextField label="Nombre, codigo o alias del evento." variant="outlined" value={codigo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCodigo(e.target.value)}></TextField>
                </CardContent>
                <CardActions>
                    {((players.length !== 0) && (date !== "") && (stadium.name !== "") && (stadium.address !== "") && (codigo !== "") ? <Button variant="contained" onClick={handleSendEvent}><Save /></Button> : null)}
                    {alert && loading ? <Alert variant="filled" severity="info">Cargando ...</Alert> : null}
                    {alert && !loading && !error.errorValue ? <Alert variant="filled" severity="info">{error.message}</Alert> : null}
                </CardActions>
            </Card>
        </>
    );
}