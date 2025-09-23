import { StadiumType } from "@/context/EventContext";
import useAlert from "@/hooks/useAlert";
import useApiStadium from "@/hooks/useApiStadium";
import { Save } from "@mui/icons-material";
import { Alert, Button, Card, CardContent, TextField } from "@mui/material";
import { useState } from "react";

const CardStadium = ({ id, name, address }: StadiumType) => {
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //estados para actualizar
    const [nameUpdate, setNameUpdate] = useState(name);
    const [addressUpdate, setAddressUpdate] = useState(address);
    //contexto para actualizar
    const urlStadium = "https://saf5-api.onrender.com/api/stadium";
    const { loadingStadium, errorStadium, putStadium } = useApiStadium(urlStadium);

    const handleSaveUpdate = () => {
        putStadium({ id: id, name: nameUpdate, address: addressUpdate });
        handleShowAlert();
        handleSetTimeOut();
    };
    return (
        <>
            <Card>
                <CardContent>
                    <TextField label="Nombre" variant="outlined" value={nameUpdate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameUpdate(e.target.value)}></TextField>
                    <TextField label="Dirección" variant="outlined" value={addressUpdate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddressUpdate(e.target.value)}></TextField>
                    <Button variant="contained" onClick={handleSaveUpdate} color="success"><Save /></Button>
                    {loadingStadium ? <Alert variant="filled" severity="info">Actualizando...</Alert> : null}
                    {!loadingStadium && errorStadium.errorValue ? <Alert variant="filled" severity="info">{errorStadium.message}</Alert> : null}
                    {alert && !loadingStadium && !errorStadium.errorValue ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
                </CardContent>
            </Card>
        </>
    );
}
export default CardStadium;