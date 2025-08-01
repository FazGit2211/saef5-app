import { Add } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";
import ModalDate from "../modals/ModalDate";
import ModalStadium from "../modals/ModalStadium";
import { StadiumType } from "@/context/EventContext";
import useModal from "@/hooks/useModal";

interface PropsType {
    date: string,
    setDate: (d: string) => void,
    stadium: StadiumType,
    addStadium: (s: StadiumType) => void
}
export default function CardNewEvent({ date, setDate, stadium, addStadium }: PropsType) {
    const router = useRouter();

    const {modalDate, closeModalDate, openModalDate, modalStadium, closeModalStadium, openModalStadium} = useModal();

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
                    <Button variant="contained" onClick={openModalDate}>Fecha<Add></Add></Button>
                    <Button variant="contained" onClick={openModalStadium}>Canchas<Add></Add></Button>
                </CardActions>
            </Card>
            {modalDate ? <ModalDate openModal={modalDate} closeModal={closeModalDate} date={date} setDate={setDate} /> : null}
            {modalStadium ? <ModalStadium openModal={modalStadium} closeModal={closeModalStadium} stadium={stadium} addStadium={addStadium} /> : null}
        </>
    )
};