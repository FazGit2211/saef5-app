import { Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/router";
import Image from "next/image";
const CardContainer = () => {
    const router = useRouter();
    const handleClickRedirect = () => {
        router.push('event/event-new');
    };
    return (
        <div className="flex m-1">
            <Image src="/FNº5.png" alt="Logo de futbol" width={200} height={200} />
            <div className="flex flex-col justify-evenly">
                <Typography variant="h5" className="text-center text-orange-600">SAEF</Typography>
                <Typography variant="h6" className="flex flex-col"><p className="text-justify m-1">La applicación web Sistema Administrativo de Eventos de Fútbol, tiene como objetivo el poder agendar los eventos de manera sencilla y rápida, mediante la incorporación de los participantes, la fecha, el lugar y un código para poder buscar e visualizar el evento.También mediante su código podrá realizar los cambios necesarios así como también su eliminación, sin la necesidad de estar registrado.Aunque de estar registrado podra tener la facilidad de visualizar a todos sus eventos.</p></Typography>
                <Button variant="contained" onClick={handleClickRedirect} color="success"><Add />Nuevo evento</Button>
            </div>
        </div>
    );
}
export default CardContainer;