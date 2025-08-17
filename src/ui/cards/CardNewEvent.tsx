import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
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
    //utilizar el hook router para redireccionar
    const router = useRouter();
    //propiedades e métodos para utilizar los modales
    const { modalDate, closeModalDate, openModalDate, modalStadium, closeModalStadium, openModalStadium } = useModal();

    const handleClickRedirect = () => {
        router.push('/player/player-new');
    };
    return (
        <>
            <Button variant="contained" onClick={handleClickRedirect}>Participantes<Add></Add></Button>
            <Button variant="contained" onClick={openModalDate}>Fecha<Add></Add></Button>
            <Button variant="contained" onClick={openModalStadium}>Cancha<Add></Add></Button>
            {modalDate ? <ModalDate openModal={modalDate} closeModal={closeModalDate} date={date} setDate={setDate} /> : null}
            {modalStadium ? <ModalStadium openModal={modalStadium} closeModal={closeModalStadium} stadium={stadium} addStadium={addStadium} /> : null}
        </>
    )
};