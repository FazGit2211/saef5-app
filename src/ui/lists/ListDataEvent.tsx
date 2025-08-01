import useApi from "@/hooks/useApi";
import { Alert, Button, ListItem, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import List from "@mui/material/List";
import { Delete, Edit, People } from "@mui/icons-material";
import EventContext from "@/context/EventContext";
import { useRouter } from "next/router";
import PlayerContext from "@/context/PlayersContext";
import DeleteEventDialog from "../dialogs/DeleteEventDialog";
import useDialog from "@/hooks/useDialog";

interface PropsType {
    codigoParams: string | string[] | undefined
}
export default function ListDataEvent({ codigoParams }: PropsType) {
    //url para poder realizar la petición hacia la api
    const url = "http://localhost:5000/api/event";
    //propiedades del hook personalizado con información del estado de la petición
    const { loading, error, getEventByCodigo, data } = useApi(url);
    //propiedades e método de los contextos
    const { addEvent, addStadium, removeEvent } = useContext(EventContext);
    const { players } = useContext(PlayerContext);
    //router para re direccionar a otra página
    const router = useRouter();
    //propiedades e métodos para los dialogos de confirmacion
    const { deleteEvent, openDeleteEvent, closeDeleteEvent } = useDialog();
    //invocación del método para buscar e obtener el evento
    useEffect(() => {
        if (codigoParams === undefined) {
            return;
        } else {
            getEventByCodigo(codigoParams.toString());
        }
    }, [url]);

    //método para cargar datos al contexto
    const addDataContextEvent = () => {
        data.forEach((elem) => {
            addEvent({ codigo: elem.codigo, date: elem.date });
            elem.Players.forEach((player) => (players.push(player)));
            addStadium({ name: elem.Stadium.name, address: elem.Stadium.address });
        });
    }
    //método para re direccionar
    const handleClickRedirect = async () => {
        addDataContextEvent();
        router.push('/event/event-update');
    };

    if (loading) {
        return <Alert variant="filled" severity="info">Cargando ...</Alert>;
    };

    if (error.errorValue) {
        return <Alert variant="filled" severity="warning">{error.message}</Alert>;
    };

    return (
        <>
            {data && data.length > 0 ? (<List>{data.map((elem) => (<ListItem key={elem.codigo}><Typography>Codigo: {elem.codigo} </Typography> <Typography>Fecha: {elem.date}</Typography> <Typography>Estadio : {elem.Stadium.name}</Typography> <Typography>Dirección : {elem.Stadium.address} </Typography></ListItem>))}</List>) : <h3>No hay datos</h3>}
            <h2>Participantes</h2>
            {data && data.length > 0 ? <List>{data.map((elem) => (elem.Players.map((player, index) => (<ListItem key={player.name}><People />{player.name} {player.state}</ListItem>))))}</List> : <h3>No hay jugadores</h3>}
            <h2>Eliminar  <Button variant="contained" onClick={openDeleteEvent}><Delete /></Button></h2>
            {deleteEvent ? <DeleteEventDialog openDialog={deleteEvent} code={codigoParams} closeDialog={closeDeleteEvent} /> : null}
            <h2>Actualizar <Button variant="contained" onClick={handleClickRedirect}><Edit /></Button></h2>
        </>
    )
}