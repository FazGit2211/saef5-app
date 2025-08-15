import PlayersContext from "@/context/PlayersContext";
import useModal from "@/hooks/useModal";
import ListPlayer from "@/ui/lists/ListPlayer";
import ModalCreatePlayer from "@/ui/modals/ModalCreatePlayer";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext } from "react";


export default function PlayerNew() {
    const { modalPlayer, closeModalPlayer, openModalPlayer } = useModal();
    const { players } = useContext(PlayersContext);
    return (
        <>
            <Button variant="contained" onClick={openModalPlayer}><Add /></Button>
            {players.length === 0 ? <h3>No hay jugadores agregados</h3> : <ListPlayer />}
            {modalPlayer ? <ModalCreatePlayer openModal={modalPlayer} closeModal={closeModalPlayer} /> : null}
        </>
    );
}