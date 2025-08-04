import PlayerContext from "@/context/PlayersContext";
import useAlert from "@/hooks/useAlert";
import { Cancel, Delete } from "@mui/icons-material";
import { Alert, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useContext } from "react";

interface PropsType {
    openDialog: boolean,
    indexDelete: number,
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
export default function DeletePlayerDialog({ openDialog, indexDelete, closeDialog }: PropsType) {
    //propiedades e métodos del contexto
    const { removePlayers } = useContext(PlayerContext);
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();

    const handleDeleted = () => {
        removePlayers(indexDelete);
        handleShowAlert();
        handleSetTimeOut();
        closeDialog();
    }
    return (
        <>
            <Dialog open={openDialog} sx={style}>
                <DialogTitle>
                    Eliminar Jugador ?
                </DialogTitle>
                <DialogActions>
                    <Button variant="contained" onClick={handleDeleted}><Delete /></Button>
                    <Button variant="contained" onClick={closeDialog}><Cancel /></Button>
                    {alert ? <Alert variant="filled" severity="success"></Alert> : null}
                </DialogActions>
            </Dialog>
        </>
    );
}