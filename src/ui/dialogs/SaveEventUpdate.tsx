import { Alert, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { PropsDialogType } from "./DeleteEventDialog";
import { Cancel, Save } from "@mui/icons-material";
import { useContext } from "react";
import EventContext from "@/context/EventContext";
import useAlert from "@/hooks/useAlert";
import { style } from "../modals/ModalCreatePlayer";
import useApiStadium from "@/hooks/useApiStadium";
import useApiEvent from "@/hooks/useApiEvent";
export default function SaveEventUpdate({ openDialog, closeDialog }: PropsDialogType) {
    //Utilizar propiedades e métodos para enviar los datos hacia la api
    const urlEvent = "http://localhost:5000/api/event";
    const { putEvent, loadingEvent, errorEvent } = useApiEvent(urlEvent);
    const urlStadium = "http://localhost:5000/api/stadium";
    const { putStadium } = useApiStadium(urlStadium);
    //Utilizar propiedades e métodos para utilizar el contexto evento
    const { event } = useContext(EventContext);
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();

    const handleSave = async () => {
        await putEvent(event.id, { codigo: event.codigo, date: event.date, userId: 0, stadium: { id: 0, name: event.Stadium.name, address: event.Stadium.address }, players: event.Player });
        await putStadium({ id: event.Stadium.id, name: event.Stadium.name, address: event.Stadium.address });
        handleShowAlert();
        handleSetTimeOut();
    };

    return (
        <>
            <Dialog open={openDialog} sx={style}>
                <DialogTitle>Confirmar?</DialogTitle>
                <DialogActions><Button variant="contained" onClick={handleSave}><Save /></Button></DialogActions>
                <Button variant="contained" onClick={closeDialog}><Cancel /></Button>
                {loadingEvent ? <Alert variant="filled" severity="info">Enviando....</Alert> : null}
                {!loadingEvent && errorEvent.errorValue ? <Alert variant="filled" severity="warning">Error {errorEvent.message}</Alert> : null}
                {alert && !loadingEvent && !errorEvent.errorValue ? <Alert variant="filled" severity="success">Actualizado</Alert> : null}
            </Dialog>
        </>
    )
}