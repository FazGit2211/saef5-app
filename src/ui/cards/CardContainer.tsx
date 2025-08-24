import { Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/router";
export default function CardContainer() {
    const router = useRouter();
    const handleClickRedirect = () => {
        router.push('event/event-new');
    };
    return (
        <>
            <Typography variant="h5">SAEF </Typography>
            <p>La applicación web Sistema administrativo de eventos de fútbol, tiene como objetivo el poder agendar los eventos de manera sencilla y rapida, mediante la incorporación de los participantes, la fecha, el lugar y un código para poder visualizar el evento.También mediante su código podrá realizar los cambios necesarios así como también su eliminación sin la necesidad de estar registrado.Aunque de estar registrado podra tener la facilidad de visualizar a todos sus eventos.</p>
            <Typography variant="h6" className="flex flex-col"><Button variant="contained" onClick={handleClickRedirect} color="success"><Add /></Button>Nuevo evento</Typography>
        </>
    );
}