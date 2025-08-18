import EventContext from "@/context/EventContext";
import useAlert from "@/hooks/useAlert";
import useApi from "@/hooks/useApi";
import { Cancel, Delete } from "@mui/icons-material";
import { Alert, Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useContext } from "react";
import { style } from "../modals/ModalCreatePlayer";

export interface PropsDialogType {
    openDialog: boolean,
    closeDialog: () => void
};
export default function DeleteEventDialog({ openDialog, closeDialog }: PropsDialogType) {
    //utilizar el hook personalizado para realizar las peticiones a la api
    const url = "http://localhost:5000/api/event";
    const { loading, error, deleteEvent } = useApi(url);
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //utilizar el contexto del evento
    const { removeEvent, event } = useContext(EventContext);
    const handleDeleted = () => {
        deleteEvent(event.id);
        if (!error.errorValue) {
            removeEvent();
            handleShowAlert();
            handleSetTimeOut();
        };
    };

    return (
        <Box>
            <Dialog open={openDialog} sx={style}>
                <DialogTitle>
                    Eliminar?
                </DialogTitle>
                <DialogActions>
                    <Button variant="contained" onClick={handleDeleted}><Delete /></Button>
                    <Button variant="contained" onClick={closeDialog}><Cancel /></Button>
                    {loading ? <Alert variant="filled" severity="info">Cargando ...</Alert> : null}
                    {!loading && error.errorValue ? <Alert variant="filled" severity="warning">{error.message}</Alert> : null}
                    {alert && !loading && !error.errorValue ? <Alert variant="filled" severity="success">Eliminado</Alert> : null}
                </DialogActions>
            </Dialog>
        </Box>
    );
}