import { Alert, Button, Card, CardActions, CardContent, Collapse, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import List from "@mui/material/List";
import { Delete, Edit, ExpandLess, ExpandMore, People } from "@mui/icons-material";
import EventContext from "@/context/EventContext";
import { useRouter } from "next/router";
import PlayerContext from "@/context/PlayersContext";
import useDialog from "@/hooks/useDialog";
import DeleteEventDialog from "../dialogs/DeleteEventDialog";
import useApiEvent from "@/hooks/useApiEvent";

interface PropsType {
    codeParams: string | string[] | undefined
}
export default function ListDataEvent({ codeParams }: PropsType) {
    //url para poder realizar la petición hacia la api
    const urlEvent = "http://localhost:5000/api/event";
    //propiedades del hook personalizado con información del estado de la petición
    const { loadingEvent, errorEvent, getEventByCode, dataEvent } = useApiEvent(urlEvent);
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
        if (codeParams !== undefined) {
            getEventByCode(codeParams.toString());
        };
    }, []);

    //método para cargar datos al contexto
    const addDataContextEvent = () => {
        addEvent({ id: dataEvent.info.id, code: dataEvent.info.code, date: dataEvent.info.date, Stadium: dataEvent.info.Stadium, Player: dataEvent.info.Players });
        dataEvent.info.Players.forEach((player) => (players.push(player)));
        addStadium({ id: dataEvent.info.Stadium.id, name: dataEvent.info.Stadium.name, address: dataEvent.info.Stadium.address });
    }
    //método para re direccionar
    const handleClickRedirect = async () => {
        if (dataEvent.info.code !== "" && dataEvent.info.code !== undefined) {
            addDataContextEvent();
            router.push('/event/event-update');
        };
    };
    //Método para mostrar el dialogo de eliminar
    const handleDeleteEvent = () => {
        if (dataEvent.info.code !== "" && dataEvent.info.code !== undefined) {
            addEvent({ id: dataEvent.info.id, code: dataEvent.info.code, date: dataEvent.info.date, Stadium: dataEvent.info.Stadium, Player: dataEvent.info.Players });
            openDeleteEvent();
        };
    };
    return (
        <Card>
            <CardContent>
                {loadingEvent ? <Alert variant="filled" severity="info">Cargando ...</Alert> : null}
                {loadingEvent && errorEvent.errorValue ? <Alert variant="filled" sx={{ backgroundColor: "red" }}>{errorEvent.message}</Alert> : null}
                {dataEvent.info !== null ? <Typography variant="h6">Codigo {dataEvent.info.code} Fecha {dataEvent.info.date} Estadio {dataEvent.info.Stadium.name} Dirección {dataEvent.info.Stadium.address}</Typography> : <Typography>No hay datos</Typography>}
                <Typography variant="h6" color="warning">PARTICIPANTES</Typography>
                {dataEvent.info !== null ? <List><ListItemButton onClick={handleOpen}>
                    <ListItemText primary="Jugadores" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {dataEvent.info.Players.length > 0 ? dataEvent.info.Players.map((elem) => (<ListItem key={elem.name}><People />{elem.name} {elem.state}</ListItem>)) : <Typography variant="h6" color="#ff5722">No Hay Jugadores Agregados</Typography>}
                        </List>
                    </Collapse></List> : <Typography>No hay datos</Typography>}
                {deleteEvent ? <DeleteEventDialog openDialog={deleteEvent} closeDialog={closeDeleteEvent} /> : null}
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleClickRedirect}><Edit />Actualizar</Button>
                <Button variant="contained" onClick={handleDeleteEvent} color="warning"><Delete />Eliminar</Button>
            </CardActions>
        </Card>
    )
}