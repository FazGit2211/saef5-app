import EventContext, { PlayerType } from "@/context/EventContext";
import PlayerContext from "@/context/PlayersContext";
import useDialog from "@/hooks/useDialog";
import useModal from "@/hooks/useModal";
import CardEvent from "@/ui/cards/CardEvent";
import CardStadium from "@/ui/cards/CardStadium";
import DeletedDialog from "@/ui/dialogs/DeletedDialog";
import SaveEventUpdate from "@/ui/dialogs/SaveEventUpdate";
import ModalCreatePlayer from "@/ui/modals/ModalCreatePlayer";
import ModalEditPlayer from "@/ui/modals/ModalEditPlayer";
import { Add, Delete, Edit, People, Save } from "@mui/icons-material";
import { Button, List, ListItem } from "@mui/material";
import { useContext, useState } from "react";

export default function EventUpdate() {
    //estados para manejar el posible cambio de la información
    const [editPlayer, setEditPlayer] = useState<PlayerType>({ name: "", surname: "", phoneNumber: 0, email: "", state: "" });
    const [indexPlayer, setIndexPlayer] = useState<number>(0);
    //propiedades e métodos para utilizar los modales
    const { modalPlayer, closeModalPlayer, openModalPlayer, modalPlayerEdit, closeModalPlayerEdit, openModalPlayerEdit } = useModal();
    //propiedades r métodos para utilizar los dialogos de confirmación
    const { deletePlayer, openDeletePlayer, closeDeletePlayer, saveEvent, openSaveEvent, closeSaveEvent } = useDialog();
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
    const handleDeletedItem = (indexDeleted: number) => {
        openDeletePlayer();
        setIndexPlayer(indexDeleted);
    };
    //método para agregar nuevo jugador
    const handleAddPlayer = () => {
        openModalPlayer();
    }
    //método para guardar e actualizar y enviar los datos
    const handleSaveEventUpdate = () => {
        addPlayers(players);
        openSaveEvent();
    }
    return (
        <>
            <h2>Información del evento a actualizar</h2>
            {event ? <CardEvent codigo={event.codigo} date={event.date} /> : <h3>No hay datos</h3>}
            {stadium ? <CardStadium name={stadium.name} address={stadium.address} /> : <h3>No hay datos</h3>}
            <h2>Participantes</h2>
            {players && players.length > 0 ? <List>{players.map((elem, index) => (<ListItem key={elem.name}><People />{elem.name} {elem.state}<Button variant="contained" onClick={() => handleSelectEdit(elem, index)}><Edit /></Button><Button variant="contained" onClick={() => handleDeletedItem(index)}><Delete /></Button></ListItem>))}</List> : <h3>No hay jugadores</h3>}
            {modalPlayerEdit ? <ModalEditPlayer openModal={modalPlayerEdit} closeModal={closeModalPlayerEdit} dataEdit={editPlayer} indexPlayer={indexPlayer} /> : null}
            {deletePlayer ? <DeletedDialog openDialog={deletePlayer} indexDelete={indexPlayer} closeDialog={closeDeletePlayer} /> : null}
            <Button variant="contained" onClick={handleAddPlayer}><Add /></Button>
            {modalPlayer ? <ModalCreatePlayer openModal={modalPlayer} closeModal={closeModalPlayer} /> : null}
            <Button variant="contained" onClick={handleSaveEventUpdate}><Save /></Button>
            {saveEvent ? <SaveEventUpdate openDialog={saveEvent} code={event.codigo} closeDialog={closeSaveEvent} /> : null}
        </>
    )
}