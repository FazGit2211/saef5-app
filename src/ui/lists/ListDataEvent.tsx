import useApi from "@/hooks/useApi";
import { Alert, Button, Card, CardActions, CardContent, ListItem, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import List from "@mui/material/List";
import { Delete, Edit, People } from "@mui/icons-material";
import EventContext from "@/context/EventContext";
import { useRouter } from "next/router";
import PlayerContext from "@/context/PlayersContext";
import useDialog from "@/hooks/useDialog";
import DeleteEventDialog from "../dialogs/DeleteEventDialog";

interface PropsType {
    codigoParams: string | string[] | undefined
}
export default function ListDataEvent({ codigoParams }: PropsType) {
    //url para poder realizar la petición hacia la api
    const url = "http://localhost:5000/api/event";
    //propiedades del hook personalizado con información del estado de la petición
    const { loading, error, getEventByCodigo, data } = useApi(url);
    //propiedades e método de los contextos
    const { addEvent, addStadium } = useContext(EventContext);
    const { players } = useContext(PlayerContext);
    //router para re direccionar a otra página
    const router = useRouter();
    //propiedades e métodos para los dialogos de confirmacion
    const { deleteEvent, openDeleteEvent, closeDeleteEvent } = useDialog();
    //invocación del método useEffect para buscar e obtener el evento
    useEffect(() => {
        if (codigoParams !== undefined) {
            getEventByCodigo(codigoParams.toString());
        };
    }, [url]);

    //método para cargar datos al contexto
    const addDataContextEvent = () => {
        addEvent({ codigo: data.codigo, date: data.date });
        data.Players.forEach((player) => (players.push(player)));
        addStadium({ name: data.Stadium.name, address: data.Stadium.address });
    };
    //método para re direccionar
    const handleClickRedirect = async () => {
        if (data) {
            addDataContextEvent();
            router.push('/event/event-update');
        };
    };
    //Método para mostrar el dialogo de eliminar
    const handleDeleteEvent = () => {
        openDeleteEvent();
    };
    return (
        <Card>
            <CardContent>
                {loading ? <Alert variant="filled" severity="info">Cargando ...</Alert> : null}
                {error.errorValue ? <Alert variant="filled" severity="warning">{error.message}</Alert> : null}
                {data ? <Typography>Codigo:{data.codigo} Fecha:{data.date} Estadio:{data.Stadium.name} Dirección:{data.Stadium.address}</Typography> : <h3>No hay datos</h3>}
                <h2>Participantes</h2>
                {data ? <List>{data.Players.map((player) => (<ListItem key={player.id}><People />{player.name} {player.state}</ListItem>))}</List> : <h3>No hay jugadores</h3>}
                {deleteEvent ? <DeleteEventDialog openDialog={deleteEvent} code={codigoParams} closeDialog={closeDeleteEvent} /> : null}
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleClickRedirect}><Edit />Actualizar</Button>
                <Button variant="contained" onClick={handleDeleteEvent}><Delete />Eliminar</Button>
            </CardActions>
        </Card>
    )
}