import EventContext, { EventType } from "@/context/EventContext";
import useAlert from "@/hooks/useAlert";
import useApi from "@/hooks/useApi";
import { Save } from "@mui/icons-material";
import { Alert, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

export default function CardEvent({ codigo, date }: EventType) {
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //estado para actualizar
    const [dateUpdate, setDateUpdate] = useState(date);
    //contexto para actualizar
    const { event, stadium, players } = useContext(EventContext);
    //Utilizar propiedades e métodos para enviar los datos hacia la api
    const urlEvent = "http://localhost:5000/api/event";
    const { putEvent, loading, error } = useApi(urlEvent);

    const handleSaveUpdate = () => {
        putEvent(event.id, { codigo: codigo, date: dateUpdate, stadium: { id: 0, name: stadium.name, address: stadium.address }, players: players });
        handleShowAlert();
        handleSetTimeOut();
    }
    return (
        <>
            <Card>
                <CardContent>
                    <Typography>Codigo: {codigo}</Typography>
                    <TextField label="Fecha" variant="outlined" value={dateUpdate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateUpdate(e.target.value)}></TextField>
                    <Button variant="contained" onClick={handleSaveUpdate} color="success"><Save /></Button>
                    {loading ? <Alert variant="filled" severity="info">Actualizando...</Alert> : null}
                    {!loading && error.errorValue ? <Alert variant="filled" severity="warning">{error.message}</Alert> : null}
                    {alert ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
                </CardContent>
            </Card>
        </>
    )
}