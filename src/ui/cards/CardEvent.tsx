import EventContext, { EventType } from "@/context/EventContext";
import useAlert from "@/hooks/useAlert";
import useApiEvent from "@/hooks/useApiEvent";
import { Save } from "@mui/icons-material";
import { Alert, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

export default function CardEvent({ codigo, date }: EventType) {
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //estado para actualizar
    const [dateUpdate, setDateUpdate] = useState(date);
    //contexto para actualizar
    const { event } = useContext(EventContext);
    //Utilizar propiedades e métodos para enviar los datos hacia la api
    const urlEvent = "http://localhost:5000/api/event";
    const { putEvent, loadingEvent, errorEvent } = useApiEvent(urlEvent);

    const handleSaveUpdate = async () => {
        await putEvent(event.id, { codigo: codigo, date: dateUpdate, userId: 0, stadium: { id: 0, name: event.Stadium.name, address: event.Stadium.address }, players: event.Player });
        handleShowAlert();
        handleSetTimeOut();
    }
    return (
        <>
            <Card>
                <CardContent>
                    <Typography>Codigo: {codigo}</Typography>
                    <TextField label="Fecha" variant="outlined" value={dateUpdate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateUpdate(e.target.value)}></TextField>
                    <Button variant="contained" onClick={handleSaveUpdate} color="info"><Save /></Button>
                    {loadingEvent ? <Alert variant="filled" severity="info">Actualizando...</Alert> : null}
                    {!loadingEvent && errorEvent.errorValue ? <Alert variant="filled" severity="warning">{errorEvent.message}</Alert> : null}
                    {alert && !loadingEvent && !errorEvent ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
                </CardContent>
            </Card>
        </>
    )
}