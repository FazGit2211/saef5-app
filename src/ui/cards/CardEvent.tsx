import EventContext, { EventType } from "@/context/EventContext";
import useAlert from "@/hooks/useAlert";
import { Save } from "@mui/icons-material";
import { Alert, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

export default function CardEvent({ codigo, date }: EventType) {
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //estado para actualizar
    const [dateUpdate, setDateUpdate] = useState(date);
    //contexto para actualizar
    const { addEvent } = useContext(EventContext);

    const handleSaveUpdate = () => {
        handleShowAlert();
        addEvent({ codigo: codigo, date: dateUpdate });
        handleSetTimeOut();
    }
    return (
        <>
            <Card>
                <CardContent>
                    <Typography>Codigo: {codigo}</Typography>
                    <TextField label="Fecha" variant="outlined" value={dateUpdate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateUpdate(e.target.value)}></TextField>
                    <Button variant="contained" onClick={handleSaveUpdate}><Save /></Button>
                    {alert ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
                </CardContent>
            </Card>
        </>
    )
}