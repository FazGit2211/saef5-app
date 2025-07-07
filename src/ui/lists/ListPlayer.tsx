import PlayerContext from "@/context/PlayersContext";
import { Delete, Edit } from "@mui/icons-material";
import { Button, ListItem } from "@mui/material";
import List from "@mui/material/List";
import { use, useContext, useState } from "react";
import ModalEditPlayer from "../modals/ModalEditPlayer";


interface PlayerType {
    name: string,
    surname: string,
    phoneNumber: number,
    email: string
};

export default function ListPlayer() {
    const [visibleModal, setVisibleModal] = useState(false);
    const [ editPlayer, setEditPlayer] = useState({});
    const { players } = useContext(PlayerContext);

    const handleSelectEdit = (elem:PlayerType) => {
        setVisibleModal(true);
        setEditPlayer(elem);
    }
    return (
        <>
            <List>
                {players.map((elem) => (<ListItem key={elem.name}>{elem.name} <Button variant="contained"><Delete /></Button> <Button variant="contained" onClick={() => handleSelectEdit(elem)}><Edit /></Button> </ListItem>))}
                <Button variant="contained">CONFIRMAR JUGADORES</Button>
            </List>
            {visibleModal ? <ModalEditPlayer/> : null}
        </>
    )
}