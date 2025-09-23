import { Button, Card, CardActions, CardContent, Collapse, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useContext, useState } from "react";
import List from "@mui/material/List";
import { Delete, Edit, ExpandLess, ExpandMore, People } from "@mui/icons-material";
import EventContext from "@/context/EventContext";
import { useRouter } from "next/router";
import useDialog from "@/hooks/useDialog";
import DeleteEventDialog from "../dialogs/DeleteEventDialog";

const ListDataEvent = () => {
    //router para re direccionar a otra página
    const router = useRouter();
    //propiedades e métodos para los dialogos de confirmacion
    const { deleteEvent, openDeleteEvent, closeDeleteEvent } = useDialog();
    //propiedades e método de los contextos
    const { event } = useContext(EventContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    //método para re direccionar
    const handleClickRedirect = async () => {
        if (event.code !== "" && event.code !== undefined) {
            router.push('/event/event-update');
        };
    };
    //Método para mostrar el dialogo de eliminar
    const handleDeleteEvent = () => {
        if (event.code !== "" && event.code !== undefined) {
            openDeleteEvent();
        };
    };
    console.log(event);
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Codigo {event.code} Fecha {event.date} Estadio {event.Stadium.name} Dirección {event.Stadium.address}</Typography>
                <Typography variant="h6" color="warning">Participantes:</Typography>
                <List><ListItemButton onClick={handleOpen}>
                    <ListItemText primary="Jugadores" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {event.Player.length > 0 ? event.Player.map((elem) => (<ListItem key={elem.name}><People />{elem.name} {elem.state}</ListItem>)) : <Typography variant="h6" color="#ff5722">No Hay Jugadores Agregados</Typography>}
                        </List>
                    </Collapse></List>
                {deleteEvent ? <DeleteEventDialog openDialog={deleteEvent} closeDialog={closeDeleteEvent} /> : null}
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleClickRedirect}><Edit />Actualizar</Button>
                <Button variant="contained" onClick={handleDeleteEvent} color="warning"><Delete />Eliminar</Button>
            </CardActions>
        </Card>
    )
}
export default ListDataEvent;