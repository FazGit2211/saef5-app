import EventContext, { StadiumType } from "@/context/EventContext";
import useAlert from "@/hooks/useAlert";
import { Save } from "@mui/icons-material";
import { Alert, Button, Card, CardContent, TextField } from "@mui/material";
import { useContext, useState } from "react";

export default function CardStadium({ name, address }: StadiumType) {
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut  } = useAlert();
    //estados para actualizar
    const [nameUpdate, setNameUpdate] = useState(name);
    const [addressUpdate, setAddressUpdate] = useState(address);
    //contexto para actualizar
    const { addStadium } = useContext(EventContext);

    const handleSaveUpdate = () => {
        handleShowAlert();
        addStadium({ name: nameUpdate, address: addressUpdate });
        handleSetTimeOut();
    }
    return (
        <>
            <Card>
                <CardContent>
                    <TextField label="Nombre" variant="outlined" value={nameUpdate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameUpdate(e.target.value)}></TextField>
                    <TextField label="Dirección" variant="outlined" value={addressUpdate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddressUpdate(e.target.value)}></TextField>
                    <Button variant="contained" onClick={handleSaveUpdate}><Save /></Button>
                    {alert ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
                </CardContent>
            </Card>
        </>
    );
}