import EventContext from "@/context/EventContext";
import useAlert from "@/hooks/useAlert";
import { Cancel, Delete } from "@mui/icons-material";
import { Alert, Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useContext } from "react";
import { style } from "../modals/ModalCreatePlayer";
import useApiEvent from "@/hooks/useApiEvent";
import { useRouter } from "next/router";

export interface PropsDialogType {
    openDialog: boolean,
    closeDialog: () => void
};
export default function DeleteEventDialog({ openDialog, closeDialog }: PropsDialogType) {
    //utilizar el hook personalizado para realizar las peticiones a la api
    const url = "http://localhost:5000/api/event";
    const { loadingEvent, errorEvent, deleteEvent } = useApiEvent(url);
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //utilizar el contexto del evento
    const { removeEvent, event } = useContext(EventContext);
    //Utilizar el router para redireccionar
    const router = useRouter();
    const handleDeleted = () => {
        deleteEvent(event.id);
        if (!errorEvent.errorValue) {
            removeEvent();
            handleShowAlert();
            handleSetTimeOut();
            router.push("/");
        };
    };
    return (
        <Box>
            <Dialog open={openDialog} sx={style}>
                <DialogTitle>
                    Eliminar?
                </DialogTitle>
                <DialogActions>
                    <Button variant="contained" onClick={handleDeleted} color="warning"><Delete /></Button>
                    <Button variant="contained" onClick={closeDialog}><Cancel /></Button>
                    {loadingEvent ? <Alert variant="filled" severity="info">Cargando ...</Alert> : null}
                    {!loadingEvent && errorEvent.errorValue ? <Alert variant="filled" severity="warning">{errorEvent.message}</Alert> : null}
                    {alert && !loadingEvent && !errorEvent.errorValue ? <Alert variant="filled" severity="success">Eliminado</Alert> : null}
                </DialogActions>
            </Dialog>
        </Box>
    );
}