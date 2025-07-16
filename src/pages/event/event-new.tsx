import PlayerContext from "@/context/PlayersContext";
import useApi from "@/hooks/useApi";
import CardNewEvent from "@/ui/cards/CardNewEvent";
import CardPlayers from "@/ui/cards/CardPlayers";
import { Save } from "@mui/icons-material";
import { Alert, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

interface StadiumType {
    name: string,
    address: string
}

export default function Event() {
    const [date, setDate] = useState("");
    const [stadium, setStadium] = useState<StadiumType>({ name: "", address: "" });
    const [codigo, setCodigo] = useState("");
    //Manejar el estado para los alert de mensajes
    const [sendForm, setSendForm] = useState(false);
    //Llamar al contexto
    const { players, removeAll } = useContext(PlayerContext);
    let url = "http://localhost:5000/api/event";
    const { loading, error, postEvent } = useApi(url);


    const handleSetDate = (d: string) => {
        setDate(d);
    };

    const handleSetStadium = (s: StadiumType) => {
        setStadium(s);
    };

    const handleSendEvent = () => {
        postEvent({ codigo, date, stadium, players });
        setSendForm(true);
        handleError();
        setTimeout(() => {
            setSendForm(false)
        }, 6000)
    };

    const handleError = () => {
        setDate("");
        setStadium({ name: "", address: "" });
        removeAll();
    };

    return (
        <>
            <CardNewEvent date={date} setDate={handleSetDate} stadium={stadium} addStadium={handleSetStadium} />
            <Card>
                <CardContent>
                    <CardPlayers />
                    <Typography>{date}</Typography>
                    <Typography>{stadium.name + '' + stadium.address}</Typography>
                    <Typography><TextField label="Nombre, codigo o alias." variant="outlined" value={codigo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCodigo(e.target.value)}></TextField></Typography>
                </CardContent>
                <CardActions>
                    {((players.length !== 0) && (date !== "") && (stadium.name !== "") && (stadium.address !== "") && (codigo !== "") ? <Button variant="contained" onClick={handleSendEvent}><Save /></Button> : null)}
                    {loading ? <Alert variant="filled" severity="info">Cargando ...</Alert> : null}
                    {sendForm ? <Alert variant="filled" severity="info">{error.message}</Alert> : null}
                </CardActions>
            </Card>
        </>
    );
}