import { Add } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import ModalDate from "../modals/ModalDate";
import ModalStadium from "../modals/ModalStadium";

interface StadiumType {
    name: string,
    address: string
}

interface PropsType {
    date: string,
    setDate: (d: string) => void,
    stadium: StadiumType,
    addStadium: (s: StadiumType) => void
}
export default function CardNewEvent({ date, setDate, stadium, addStadium }: PropsType) {
    const router = useRouter();
    const [openModalDate, setOpenModalDate] = useState(false);
    const [openModalStadium, setOpenModalStadium] = useState(false);
    const handleClose = () => { setOpenModalDate(false) };
    const handleOpen = () => { setOpenModalDate(true) };
    const handleCloseModalStadium = () => { setOpenModalStadium(false) };
    const handleOpenModalStadium = () => { setOpenModalStadium(true) };

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
                    <Button variant="contained" onClick={handleOpen}>Fecha<Add></Add></Button>
                    <Button variant="contained" onClick={handleOpenModalStadium}>Canchas<Add></Add></Button>
                </CardActions>
            </Card>
            {openModalDate ? <ModalDate openModal={openModalDate} closeModal={handleClose} date={date} setDate={setDate} /> : null}
            {openModalStadium ? <ModalStadium openModal={openModalStadium} closeModal={handleCloseModalStadium} stadium={stadium} addStadium={addStadium} /> : null}
        </>
    )
};