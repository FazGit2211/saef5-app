import { useState } from "react";

const useDialog = () => {
    //mostrar el modal de confirmacion para eliminar
    const [deletePlayer, setDeletePlayer] = useState(false);
    const openDeletePlayer = () => { setDeletePlayer(true) }
    const closeDeletePlayer = () => { setDeletePlayer(false); };
    //mostrar el modal de confirmacion para eliminar
    const [deleteEvent, setDeleteEvent] = useState(false);
    const openDeleteEvent = () => { setDeleteEvent(true) }
    const closeDeleteEvent = () => { setDeleteEvent(false); };
    //mostrar el modal de confirmacion para guardar
    const [saveEvent, setSaveEvent] = useState(false);
    const openSaveEvent = () => { setSaveEvent(true) }
    const closeSaveEvent = () => { setSaveEvent(false); };

    return { deletePlayer, deleteEvent, saveEvent, openDeletePlayer, closeDeletePlayer, openDeleteEvent, closeDeleteEvent, openSaveEvent, closeSaveEvent }

}

export default useDialog;