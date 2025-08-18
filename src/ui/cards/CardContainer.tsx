import { Button, Card, TextField } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useState } from "react";
export default function CardContainer() {
    const router = useRouter();
    const [codigo, setCodigo] = useState("");

    const handleClickRedirect = () => {
        router.push('event/event-new');
    };
    const handleClickBtnCodigo = () => {
        if (codigo.trim() !== "") {
            router.push(`event/event-find/${codigo}`);
        };
    };
    return (
        <>
            <Button variant="contained" onClick={handleClickRedirect}>Nuevo evento <Add /></Button>
            <TextField label="Nombre,codigo o alias evento" variant="filled" value={codigo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCodigo(e.target.value)} sx={{backgroundColor:"white"}}></TextField>
            <Button variant="contained" onClick={handleClickBtnCodigo}><Search /></Button>
        </>
    );
}