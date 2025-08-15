import EventContext, { PlayerType } from "@/context/EventContext";
import PlayerContext from "@/context/PlayersContext";
import useDialog from "@/hooks/useDialog";
import useModal from "@/hooks/useModal";
import CardEvent from "@/ui/cards/CardEvent";
import CardStadium from "@/ui/cards/CardStadium";
import DeletePlayerDialog from "@/ui/dialogs/DeletePlayerDialog";
import SaveEventUpdate from "@/ui/dialogs/SaveEventUpdate";
import ModalAddPlayerEvent from "@/ui/modals/ModalAddPlayerEvent";
import ModalEditPlayerEvent from "@/ui/modals/ModalEditPlayerEvent";
import { Add, Delete, Edit, People, Save } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, List, ListItem } from "@mui/material";
import { useContext, useState } from "react";

export default function EventUpdate() {
    //Utilizar estados para manejar el posible cambio de la información
    const [editPlayer, setEditPlayer] = useState<PlayerType>({ id: 0, name: "", email: "", state: "", admin: true });
    const [indexPlayer, setIndexPlayer] = useState<number>(0);
    //Utilizar propiedades e métodos para utilizar los modales
    const { modalPlayer, closeModalPlayer, openModalPlayer, modalPlayerEdit, closeModalPlayerEdit, openModalPlayerEdit } = useModal();
    //Utilizar propiedades e métodos para utilizar los dialogos de confirmación
    const { deletePlayer, openDeletePlayer, closeDeletePlayer, saveEvent, closeSaveEvent } = useDialog();
    //propiedades e métodos para utilizar los datos del contexto
    const { event, stadium, addPlayers } = useContext(EventContext);
    const { players } = useContext(PlayerContext);
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
                    {event ? <CardEvent id={event.id} codigo={event.codigo} date={event.date} /> : <h3>No hay datos</h3>}
                    {stadium ? <CardStadium id={stadium.id} name={stadium.name} address={stadium.address} /> : <h3>No hay datos</h3>}
                    {players && players.length > 0 ? <List>{players.map((elem, index) => (<ListItem key={elem.id}><People />{elem.name} {elem.state}<Button variant="contained" onClick={() => handleSelectEdit(elem, index)}><Edit /></Button><Button variant="contained" onClick={() => handleDeletedItem(index, elem)}><Delete /></Button></ListItem>))}</List> : <h3>No hay jugadores</h3>}
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={handleAddPlayer}><Add /></Button>
                </CardActions>
            </Card>
            {modalPlayerEdit ? <ModalEditPlayerEvent openModal={modalPlayerEdit} closeModal={closeModalPlayerEdit} dataEdit={editPlayer} indexPlayer={indexPlayer} /> : null}
            {deletePlayer ? <DeletePlayerDialog openDialog={deletePlayer} indexDelete={indexPlayer} closeDialog={closeDeletePlayer} playerDelete={editPlayer} /> : null}
            {modalPlayer ? <ModalAddPlayerEvent openModal={modalPlayer} closeModal={closeModalPlayer}/> : null}
            {saveEvent ? <SaveEventUpdate openDialog={saveEvent} closeDialog={closeSaveEvent} /> : null}
        </>
    )
}