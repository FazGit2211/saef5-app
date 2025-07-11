'use client'
import PlayersContext from "@/context/PlayersContext";
import ListPlayer from "@/ui/lists/ListPlayer";
import ModalCreatePlayer from "@/ui/modals/ModalCreatePlayer";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext, useState } from "react";


export default function PlayerNew() {

    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => { setOpenModal(false) };
    const handleOpen = () => { setOpenModal(true) };
    const { players } = useContext(PlayersContext);


    return (
        <>
            <Button variant="contained" onClick={handleOpen}><Add /></Button>
            {players.length === 0 ? <h3>No hay jugadores agregados</h3> : <ListPlayer />}
            {openModal ? <ModalCreatePlayer openModal={openModal} closeModal={handleClose} /> : null}
        </>
    );
}