import { Button, FormGroup, TextField, Typography } from "@mui/material";
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
            <Typography variant="h6" className="flex flex-col"><Button variant="contained" onClick={handleClickRedirect} color="success"><Add /></Button>Nuevo evento</Typography>
            <FormGroup>
                <TextField label="Nombre,codigo o alias evento" variant="outlined" value={codigo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCodigo(e.target.value)} ></TextField>
                <Button variant="contained" onClick={handleClickBtnCodigo} color="info"><Search /></Button>
            </FormGroup>
        </>
    );
}