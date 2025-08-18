import PlayerContext from "@/context/PlayersContext";
import { ExpandLess, ExpandMore, People } from "@mui/icons-material";
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
                    <ListItemButton onClick={handleOpen}>
                        <ListItemText primary="Jugadores" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {players.length > 0 ? players.map((elem) => (<ListItem key={elem.id}><People />{elem.name} {elem.state}</ListItem>)) : <Typography variant="h6" color="#ff5722">No Hay Jugadores Agregados</Typography>}
                        </List>
                    </Collapse>
                </List>
            </CardContent>
        </Card>
    )
}