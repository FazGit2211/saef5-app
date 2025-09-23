import EventContext from "@/context/EventContext";
import PlayerContext, { PlayerType } from "@/context/PlayersContext";
import useDialog from "@/hooks/useDialog";
import useModal from "@/hooks/useModal";
import CardEvent from "@/ui/cards/CardEvent";
import CardStadium from "@/ui/cards/CardStadium";
import DeletePlayerDialog from "@/ui/dialogs/DeletePlayerDialog";
import SaveEventUpdate from "@/ui/dialogs/SaveEventUpdate";
import ModalAddPlayerEvent from "@/ui/modals/ModalAddPlayerEvent";
import ModalEditPlayerEvent from "@/ui/modals/ModalEditPlayerEvent";
import { Add, Delete, Edit, ExpandLess, ExpandMore, People } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Collapse, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useContext, useState } from "react";

const EventUpdate = () => {
    //Utilizar estados para manejar el posible cambio de la información
    const [editPlayer, setEditPlayer] = useState<PlayerType>({ id: 0, name: "", email: "", state: "", admin: true });
    const [indexPlayer, setIndexPlayer] = useState<number>(0);
    //Utilizar propiedades e métodos para utilizar los modales
    const { modalPlayer, closeModalPlayer, openModalPlayer, modalPlayerEdit, closeModalPlayerEdit, openModalPlayerEdit } = useModal();
    //Utilizar propiedades e métodos para utilizar los dialogos de confirmación
    const { deletePlayer, openDeletePlayer, closeDeletePlayer, saveEvent, closeSaveEvent } = useDialog();
    //propiedades e métodos para utilizar los datos del contexto
    const { event } = useContext(EventContext);
    const { players } = useContext(PlayerContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    //método para editar al jugador individualmente por el index
    const handleSelectEdit = (elem: PlayerType, index: number) => {
        setEditPlayer(elem);
        setIndexPlayer(index);
        openModalPlayerEdit();
    };
    //método para eliminar a un jugador por index
    const handleDeletedItem = (indexDeleted: number, elem: PlayerType) => {
        setEditPlayer(elem);
        openDeletePlayer();
        setIndexPlayer(indexDeleted);
    };
    //método para agregar nuevo jugador
    const handleAddPlayer = () => {
        openModalPlayer();
    };
    return (
        <>
            <Card>
                <CardContent>
                    {event ? <CardEvent id={event.id} code={event.code} date={event.date} Stadium={{ id: event.Stadium.id, name: event.Stadium.name, address: event.Stadium.address }} Player={[]} /> : <Typography variant="h6">No hay datos</Typography>}
                    {event.Stadium ? <CardStadium id={event.Stadium.id} name={event.Stadium.name} address={event.Stadium.address} /> : <h3>No hay datos</h3>}
                    <List>
                        <ListItemButton onClick={handleOpen}>
                            <ListItemText primary="Jugadores" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {players.map((elem, index) => (<ListItem key={elem.id}><People />{elem.name} {elem.state}<Button variant="contained" onClick={() => handleSelectEdit(elem, index)} color="secondary"><Edit /></Button><Button variant="contained" onClick={() => handleDeletedItem(index, elem)} color="warning"><Delete /></Button></ListItem>))}
                            </List>
                        </Collapse>
                    </List>
                </CardContent>
                <CardActions>
                    <Typography><Button variant="contained" onClick={handleAddPlayer} color="success"><Add /></Button>Agregar nuevo</Typography>
                </CardActions>
            </Card>
            {modalPlayerEdit ? <ModalEditPlayerEvent openModal={modalPlayerEdit} closeModal={closeModalPlayerEdit} dataEdit={editPlayer} indexPlayer={indexPlayer} /> : null}
            {deletePlayer ? <DeletePlayerDialog openDialog={deletePlayer} indexDelete={indexPlayer} closeDialog={closeDeletePlayer} playerDelete={editPlayer} /> : null}
            {modalPlayer ? <ModalAddPlayerEvent openModal={modalPlayer} closeModal={closeModalPlayer} /> : null}
            {saveEvent ? <SaveEventUpdate openDialog={saveEvent} closeDialog={closeSaveEvent} /> : null}
        </>
    )
}
export default EventUpdate;