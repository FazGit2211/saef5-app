import useApi from "@/hooks/useApi";
import { Alert, Button, Card, CardActions, CardContent, Collapse, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import List from "@mui/material/List";
import { Delete, Edit, ExpandLess, ExpandMore, People } from "@mui/icons-material";
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
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    //invocación del método useEffect para buscar e obtener el evento
    useEffect(() => {
        if (codigoParams !== undefined) {
            getEventByCodigo(codigoParams.toString());
        };
    }, []);

    //método para cargar datos al contexto
    const addDataContextEvent = () => {
        addEvent({ id: data.info.id, codigo: data.info.codigo, date: data.info.date });
        data.info.Players.forEach((player) => (players.push(player)));
        addStadium({ id: data.info.Stadium.id, name: data.info.Stadium.name, address: data.info.Stadium.address });
    }
    //método para re direccionar
    const handleClickRedirect = async () => {
        if (data) {
            addDataContextEvent();
            router.push('/event/event-update');
        };
    };
    //Método para mostrar el dialogo de eliminar
    const handleDeleteEvent = () => {
        addEvent({ id: data.info.id, codigo: data.info.codigo, date: data.info.date });
        openDeleteEvent();
    };

    return (
        <Card>
            <CardContent>
                {loading ? <Alert variant="filled" severity="info">Cargando ...</Alert> : null}
                {!loading && error.errorValue ? <Alert variant="filled" sx={{ backgroundColor: "red" }}>{error.message}</Alert> : null}
                {data ? <Typography>Codigo:{data.info.codigo} Fecha:{data.info.date} Estadio:{data.info.Stadium.name} Dirección:{data.info.Stadium.address}</Typography> : <h3>No hay datos</h3>}
                <h2>Participantes</h2>
                {data ? <List><ListItemButton onClick={handleOpen}>
                    <ListItemText primary="Jugadores" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {data.info.Players.length > 0 ? data.info.Players.map((elem) => (<ListItem key={elem.name}><People />{elem.name} {elem.state}</ListItem>)) : <Typography variant="h6" color="#ff5722">No Hay Jugadores Agregados</Typography>}
                        </List>
                    </Collapse></List> : null}
                {deleteEvent ? <DeleteEventDialog openDialog={deleteEvent} closeDialog={closeDeleteEvent} /> : null}
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleClickRedirect}><Edit />Actualizar</Button>
                <Button variant="contained" onClick={handleDeleteEvent} color="warning"><Delete />Eliminar</Button>
            </CardActions>
        </Card>
    )
}