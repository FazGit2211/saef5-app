import PlayerContext from "@/context/PlayersContext";
import ListPlayer from "@/ui/lists/ListPlayer";
import { Add } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export default function Event() {
    const router = useRouter();
    const [disabledBtn, setDisabledBtn] = useState(false);
    const { players } = useContext(PlayerContext);

    const handleClickRedirect = () => {
        router.push('/player/player-new');
    };

    return (
        <>
            <Card>
                <CardMedia></CardMedia>
                <CardContent>
                    <Typography>
                        Desde esta seccion podra crear un evento nuevo mediante la agregacion de las personas, la fecha de realizacion y la seleccion de las canchas.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={handleClickRedirect}>Participantes<Add></Add></Button>
                    <Button variant="contained">Fecha<Add></Add></Button>
                    <Button variant="contained">Canchas<Add></Add></Button>
                </CardActions>
            </Card>
            {players.length === 0 ? null : <ListPlayer disabledBtn={disabledBtn} />}
        </>
    );
}