import EventContext, { EventType } from "@/context/EventContext";
import useAlert from "@/hooks/useAlert";
import useApiEvent from "@/hooks/useApiEvent";
import { Save } from "@mui/icons-material";
import { Alert, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

const CardEvent = ({ code, date }: EventType) => {
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //estado para actualizar
    const [dateUpdate, setDateUpdate] = useState(date);
    //contexto para actualizar
    const { event } = useContext(EventContext);
    //Utilizar propiedades e métodos para enviar los datos hacia la api
    const urlEvent = "https://saf5-api.onrender.com/api/event";
    const { putEvent, loadingEvent, errorEvent } = useApiEvent(urlEvent);

    const handleSaveUpdate = () => {
        putEvent(event.id, { code, date: dateUpdate, userId: 0, stadium: { id: 0, name: event.Stadium.name, address: event.Stadium.address }, players: event.Player });
        handleShowAlert();
        handleSetTimeOut();
    };
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h6">CODIGO: {code}</Typography>
                    <TextField label="Fecha" variant="outlined" value={dateUpdate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateUpdate(e.target.value)}></TextField>
                    <Button variant="contained" onClick={handleSaveUpdate} color="success"><Save /></Button>
                    {loadingEvent ? <Alert variant="filled" severity="info">Actualizando...</Alert> : null}
                    {alert && !loadingEvent && errorEvent.errorValue ? <Alert variant="filled" severity="warning">{errorEvent.message}</Alert> : null}
                    {alert && !loadingEvent && !errorEvent ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
                </CardContent>
            </Card>
        </>
    )
}
export default CardEvent;