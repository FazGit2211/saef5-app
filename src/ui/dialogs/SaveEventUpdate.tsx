import { Alert, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { PropsDialogType } from "./DeleteEventDialog";
import { Cancel, Save } from "@mui/icons-material";
import useApi from "@/hooks/useApi";
import { useContext } from "react";
import EventContext from "@/context/EventContext";
import useAlert from "@/hooks/useAlert";
import { style } from "../modals/ModalCreatePlayer";
import useApiStadium from "@/hooks/useApiStadium";
export default function SaveEventUpdate({ openDialog, closeDialog }: PropsDialogType) {
    //Utilizar propiedades e métodos para enviar los datos hacia la api
    const urlEvent = "http://localhost:5000/api/event";
    const { putEvent, loading, error } = useApi(urlEvent);
    const urlStadium = "http://localhost:5000/api/stadium";
    const { putStadium } = useApiStadium(urlStadium);
    //Utilizar propiedades e métodos para utilizar el contexto evento
    const { event, stadium, players } = useContext(EventContext);
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();

    const handleSave = () => {
        putEvent(event.id, { codigo: event.codigo, date: event.date, stadium: { id: 0, name: stadium.name, address: stadium.address }, players: players });
        putStadium({ id: stadium.id, name: stadium.name, address: stadium.address });
        handleShowAlert();
        handleSetTimeOut();
    };

    return (
        <>
            <Dialog open={openDialog} sx={style}>
                <DialogTitle>Confirmar?</DialogTitle>
                <DialogActions><Button variant="contained" onClick={handleSave}><Save /></Button></DialogActions>
                <Button variant="contained" onClick={closeDialog}><Cancel /></Button>
                {loading ? <Alert variant="filled" severity="info">Enviando....</Alert> : null}
                {!loading && error.errorValue ? <Alert variant="filled" severity="warning">Error {error.message}</Alert> : null}
                {alert && !loading && !error.errorValue ? <Alert variant="filled" severity="success">Actualizado</Alert> : null}
            </Dialog>
        </>
    )
}