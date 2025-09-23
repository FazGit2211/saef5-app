import PlayersContext from "@/context/PlayersContext";
import useModal from "@/hooks/useModal";
import ListPlayer from "@/ui/lists/ListPlayer";
import ModalCreatePlayer from "@/ui/modals/ModalCreatePlayer";
import { Add } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useContext } from "react";


const PlayerNew = () => {
    const { modalPlayer, closeModalPlayer, openModalPlayer } = useModal();
    const { players } = useContext(PlayersContext);
    return (
        <>
            <Typography variant="h6" className="flex flex-col">
                <Button variant="contained" onClick={openModalPlayer} color="success"><Add /></Button>Agregar Nuevo
            </Typography>
            {players.length === 0 ? <Typography variant="h6" color="primary">No hay jugadores</Typography> : <ListPlayer />}
            {modalPlayer ? <ModalCreatePlayer openModal={modalPlayer} closeModal={closeModalPlayer} /> : null}
        </>
    );
}
export default PlayerNew;