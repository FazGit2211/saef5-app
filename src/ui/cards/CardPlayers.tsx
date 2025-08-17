import PlayerContext from "@/context/PlayersContext";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Card, CardContent, Collapse, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useContext, useState } from "react";

export default function CardPlayers() {
    const { players } = useContext(PlayerContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    return (
        <Card>
            <CardContent>
                <List>
                    <ListItemButton onClick={handleOpen} color="info">
                        <ListItemText primary="Jugadores" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {players.length === 0 ? <Typography variant="h6" color="#ff5722">No Hay Jugadores Agregados</Typography> : players.map((elem) => { return <ListItem key={elem.id}>{elem.name}</ListItem> })}
                        </List>
                    </Collapse>
                </List>
            </CardContent>
        </Card>
    )
}