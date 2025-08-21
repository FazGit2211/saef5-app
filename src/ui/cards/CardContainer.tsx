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
            <Typography variant="h6" className="flex flex-col"><Button variant="contained" onClick={handleClickRedirect} color="success"><Add /></Button>Nuevo evento</Typography>
        </>
    );
}