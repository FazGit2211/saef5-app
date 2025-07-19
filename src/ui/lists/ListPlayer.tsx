import PlayerContext from "@/context/PlayersContext";
import { Delete, Edit, People } from "@mui/icons-material";
import { Button, ListItem } from "@mui/material";
import List from "@mui/material/List";
import { useContext, useState } from "react";
import ModalEditPlayer from "../modals/ModalEditPlayer";
import DeletedDialog from "../dialogs/DeletedDialog";
import { useRouter } from "next/router";


interface PlayerType {
    name: string,
    surname: string,
    phoneNumber: number,
    email: string
};


export default function ListPlayer() {
    const [visibleModal, setVisibleModal] = useState(false);
    const [editPlayer, setEditPlayer] = useState<PlayerType>({ name: "", surname: "", phoneNumber: 0, email: "" });
    const { players } = useContext(PlayerContext);
    const [indexPlayer, setIndexPlayer] = useState<number>(0);
    const [openDialog, setOpenDialog] = useState(false);
    const router = useRouter()

    const handleSelectEdit = (elem: PlayerType, index: number) => {
        setVisibleModal(true);
        setEditPlayer(elem);
        setIndexPlayer(index);
    };

    const handleVisibleModal = () => {
        setVisibleModal(false);
    };

    const handleDeletedItem = (indexDeleted: number) => {
        setOpenDialog(true);
        setIndexPlayer(indexDeleted);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
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
            {visibleModal ? <ModalEditPlayer openModal={visibleModal} closeModal={handleVisibleModal} dataEdit={editPlayer} indexPlayer={indexPlayer} /> : null}
            {openDialog ? <DeletedDialog openDialog={openDialog} indexDelete={indexPlayer} closeDialog={handleCloseDialog} /> : null}
        </>
    )
}