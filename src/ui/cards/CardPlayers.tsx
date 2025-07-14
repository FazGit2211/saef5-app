import PlayerContext from "@/context/PlayersContext";
import { Card, CardContent, List, ListItem, Typography } from "@mui/material";
import { useContext } from "react";

export default function CardPlayers() {
    const { players } = useContext(PlayerContext);
    return (
        <Card>
            <CardContent>
                <List>
                    {players.length === 0 ? <Typography>No Hay Jugadores Agregados</Typography> : players.map((elem) => {return <ListItem key={elem.name}>{elem.name}</ListItem>})}
                </List>
            </CardContent>
        </Card>
    )
}