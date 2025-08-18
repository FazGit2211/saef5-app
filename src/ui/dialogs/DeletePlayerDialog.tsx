import { PlayerType } from "@/context/EventContext";
import PlayerContext from "@/context/PlayersContext";
import useAlert from "@/hooks/useAlert";
import useApiPlayer from "@/hooks/useApiPlayer";
import { Cancel, Delete } from "@mui/icons-material";
import { Alert, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useContext } from "react";
import { style } from "../modals/ModalCreatePlayer";

interface PropsType {
    openDialog: boolean,
    indexDelete: number,
    playerDelete: PlayerType,
    closeDialog: () => void,
};
export default function DeletePlayerDialog({ openDialog, indexDelete, playerDelete, closeDialog }: PropsType) {
    //propiedades e métodos del contexto
    const { removePlayers } = useContext(PlayerContext);
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //utilizar el hook personalizado para eliminar un jugador
    const url = "http://localhost:5000/api/player";
    const { deletePlayer, loadingPlayer, errorPlayer } = useApiPlayer(url);

    const handleDeleted = () => {
        if (playerDelete.id !== undefined && playerDelete.name !== "") {
            deletePlayer(playerDelete.id);
        };
        if (!errorPlayer.errorValue) {
            removePlayers(indexDelete);
            handleShowAlert();
            handleSetTimeOut();
        }
    };
    return (
        <>
            <Dialog open={openDialog} sx={style}>
                <DialogTitle>
                    Eliminar Jugador ?
                </DialogTitle>
                <DialogActions>
                    <Button variant="contained" onClick={handleDeleted} sx={{ backgroundColor: "red" }}><Delete /></Button>
                    <Button variant="contained" onClick={closeDialog}><Cancel /></Button>
                    {loadingPlayer ? <Alert variant="filled" severity="info">Eliminando...</Alert> : null}
                    {!loadingPlayer && errorPlayer.errorValue ? <Alert variant="filled" severity="warning">{errorPlayer.message}</Alert> : null}
                    {alert && !loadingPlayer && !errorPlayer.errorValue ? <Alert variant="filled" severity="success"></Alert> : null}
                </DialogActions>
            </Dialog>
        </>
    );
}