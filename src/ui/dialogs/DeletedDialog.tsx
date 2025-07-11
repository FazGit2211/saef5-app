import PlayerContext from "@/context/PlayersContext";
import { Delete } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
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

export default function DeletedDialog({ openDialog, indexDelete, closeDialog }: PropsType) {
    const { removePlayers } = useContext(PlayerContext);

    const handleDeleted = () => {
        removePlayers(indexDelete);
        closeDialog();
    }

    return (
        <Dialog open={openDialog} sx={style}>
            <DialogTitle>
                Eliminar Jugador
            </DialogTitle>
            <DialogActions>
                <Button variant="contained" onClick={handleDeleted}><Delete /></Button>
            </DialogActions>
        </Dialog>
    )
}