import PlayerContext, { PlayerType } from "@/context/PlayersContext";
import { Delete, Edit, ExpandLess, ExpandMore, People } from "@mui/icons-material";
import { Button, Card, CardActions, Collapse, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import List from "@mui/material/List";
import { useContext, useState } from "react";
import ModalEditPlayer from "../modals/ModalEditPlayer";
import { useRouter } from "next/router";
import useModal from "@/hooks/useModal";
import useDialog from "@/hooks/useDialog";
import DeletePlayerDialog from "../dialogs/DeletePlayerDialog";

export default function ListPlayer() {
    //propiedades e método para utilizar los modales
    const { modalPlayer, closeModalPlayer, openModalPlayer } = useModal();
    //propiedades e método para utilizar los dialogos de confirmacion
    const { deletePlayer, openDeletePlayer, closeDeletePlayer } = useDialog();
    //Utilizar propiedades e  métodos del contexto
    const { players } = useContext(PlayerContext);
    //Estados 
    const [editPlayer, setEditPlayer] = useState<PlayerType>({ id: 0, name: "", email: "", state: "", admin: true });
    const [indexPlayer, setIndexPlayer] = useState<number>(0);
    const [open, setOpen] = useState(false);
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
    };
    const handleOpen = () => {
        setOpen(!open);
    };
    return (
        <Card>
            <List>
                <ListItemButton onClick={handleOpen} color="info">
                    <ListItemText primary="Jugadores" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {players.map((elem, index) => (<ListItem key={elem.name}><Typography variant="h6"><People />{elem.name}</Typography>  <Button variant="contained" onClick={() => handleDeletedItem(index)} sx={{ backgroundColor: "red", margin: 1 }}><Delete /></Button> <Button variant="contained" onClick={() => handleSelectEdit(elem, index)} color="secondary"><Edit /></Button> </ListItem>))}
                    </List>
                </Collapse>
            </List>
            <CardActions><Button variant="contained" onClick={handleConfirmBtn}>Confirmar a los jugadores</Button></CardActions>
            {modalPlayer ? <ModalEditPlayer openModal={modalPlayer} closeModal={closeModalPlayer} dataEdit={editPlayer} indexPlayer={indexPlayer} /> : null}
            {deletePlayer ? <DeletePlayerDialog openDialog={deletePlayer} indexDelete={indexPlayer} closeDialog={closeDeletePlayer} playerDelete={{ id: 0, name: "", email: "", state: "", admin: true }} /> : null}
        </Card>
    )
}