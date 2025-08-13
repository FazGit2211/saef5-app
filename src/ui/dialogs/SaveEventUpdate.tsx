import { Alert, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { PropsDialogType } from "./DeleteEventDialog";
import { Cancel, Save } from "@mui/icons-material";
import useApi from "@/hooks/useApi";
import { useContext } from "react";
import EventContext from "@/context/EventContext";
import useAlert from "@/hooks/useAlert";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 20,
    p: 2,
};
export default function SaveEventUpdate({ openDialog, closeDialog }: PropsDialogType) {
    //propiedades e métodos para enviar los datos hacia la api
    const url = "http://localhost:5000/api/event";
    const { putEvent, loading, error } = useApi(url);
    //propiedades e métodos para utilizar el contexto evento
    const { event, stadium, players } = useContext(EventContext);
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();

    const handleSave = () => {
            putEvent(event.codigo,{codigo:event.codigo,date:event.date,stadium:{id:0,name:stadium.name,address:stadium.address},players:players});
            handleShowAlert();
            handleSetTimeOut();
    };

    return (
        <>
            <Dialog open={openDialog} sx={style}>
                <DialogTitle>Confirmar?</DialogTitle>
                <DialogActions><Button variant="contained" onClick={handleSave}><Save /></Button></DialogActions>
                <Button variant="contained" onClick={closeDialog}><Cancel /></Button>
                {alert && loading ? <Alert variant="filled" severity="info">Enviando....{error.message}</Alert> : null}
                {alert && !loading && !error.errorValue ? <Alert variant="filled" severity="success">Actualizado correctamente</Alert> : null}
            </Dialog>
        </>
    )
}