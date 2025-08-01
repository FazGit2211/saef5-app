import PlayerContext from "@/context/PlayersContext";
import { Delete, Edit, People } from "@mui/icons-material";
import { Button, ListItem } from "@mui/material";
import List from "@mui/material/List";
import { useContext, useState } from "react";
import ModalEditPlayer from "../modals/ModalEditPlayer";
import DeletedDialog from "../dialogs/DeletedDialog";
import { useRouter } from "next/router";
import { PlayerType } from "@/context/EventContext";
import useModal from "@/hooks/useModal";
import useDialog from "@/hooks/useDialog";

export default function ListPlayer() {
    //propiedades e método para utilizar los modales
    const { modalPlayer, closeModalPlayer, openModalPlayer } = useModal();
    //propiedades e método para utilizar los dialogos de confirmacion
    const { deletePlayer, openDeletePlayer, closeDeletePlayer } = useDialog();
    const [editPlayer, setEditPlayer] = useState<PlayerType>({ name: "", surname: "", phoneNumber: 0, email: "", state: "" });
    const { players } = useContext(PlayerContext);
    const [indexPlayer, setIndexPlayer] = useState<number>(0);
    const router = useRouter()

    const handleSelectEdit = (elem: PlayerType, index: number) => {
        openModalPlayer();
        setEditPlayer(elem);
        setIndexPlayer(index);
    };

    const handleDeletedItem = (indexDeleted: number) => {
        openDeletePlayer();
        setIndexPlayer(indexDeleted);
    };


    const handleConfirmBtn = () => {
        router.push("/event/event-new")
    }
    return (
        <>
            <List>
                {players.map((elem, index) => (<ListItem key={elem.name}><People /> {elem.name} <Button variant="contained" onClick={() => handleDeletedItem(index)}><Delete /></Button> <Button variant="contained" onClick={() => handleSelectEdit(elem, index)}><Edit /></Button> </ListItem>))}
                <Button variant="contained" onClick={handleConfirmBtn}>CONFIRMAR JUGADORES</Button>
            </List>
            {modalPlayer ? <ModalEditPlayer openModal={modalPlayer} closeModal={closeModalPlayer} dataEdit={editPlayer} indexPlayer={indexPlayer} /> : null}
            {deletePlayer ? <DeletedDialog openDialog={deletePlayer} indexDelete={indexPlayer} closeDialog={closeDeletePlayer} /> : null}
        </>
    )
}