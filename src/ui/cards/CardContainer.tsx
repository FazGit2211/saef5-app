import { Button, FormGroup, TextField } from "@mui/material";
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
            <Button variant="contained" onClick={handleClickRedirect} color="success">Nuevo evento <Add /></Button>
            <FormGroup>
                <TextField label="Nombre,codigo o alias evento" variant="outlined" value={codigo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCodigo(e.target.value)} ></TextField>
                <Button variant="contained" onClick={handleClickBtnCodigo} color="info"><Search /></Button>
            </FormGroup>
        </>
    );
}