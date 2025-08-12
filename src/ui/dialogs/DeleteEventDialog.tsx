import EventContext from "@/context/EventContext";
import useAlert from "@/hooks/useAlert";
import useApi from "@/hooks/useApi";
import { Cancel, Delete } from "@mui/icons-material";
import { Alert, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useContext} from "react";

export interface PropsDialogType {
    openDialog: boolean,
    code: string | string[] | undefined,
    closeDialog: () => void
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function DeleteEventDialog({ openDialog, code, closeDialog }: PropsDialogType) {
    //utilizar el hook personalizado para realizar las peticiones a la api
    const url = "http://localhost:5000/api/event";
    const { loading, error, deleteEvent } = useApi(url);
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //utilizar el contexto del evento
    const { removeEvent } = useContext(EventContext);
    const handleDeleted = () => {
        if (code !== undefined) {
            deleteEvent(code.toString());
            handleShowAlert();
            handleSetTimeOut();
        }
    };

    return (
        <>
            <Dialog open={openDialog} sx={style}>
                <DialogTitle>
                    Eliminar?
                </DialogTitle>
                <DialogActions>
                    <Button variant="contained" onClick={handleDeleted}><Delete /></Button>
                    <Button variant="contained" onClick={closeDialog}><Cancel /></Button>
                    {alert && loading ? <Alert variant="filled" severity="info">Cargando ...</Alert> : null}
                    {alert && !loading ? <Alert variant="filled" severity="success">{error.message}</Alert> : null}
                </DialogActions>
            </Dialog>
        </>
    );
}