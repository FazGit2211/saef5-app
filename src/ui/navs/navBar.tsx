import { AppBar, IconButton, TextField, Toolbar } from "@mui/material";
import { AccountCircle, LightMode, Search } from "@mui/icons-material";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

export default function NavBar() {
    const router = useRouter();
    const [codigo, setCodigo] = useState("");
    const handleClickRedirect = () => {
        router.push('/');
    };
    const handleClickBtnCodigo = () => {
        if (codigo.trim() !== "") {
            router.push(`event/event-find/${codigo}`);
        };
    };
    return (
        <AppBar position="static" color="info">
            <Toolbar className="justify-evenly">
                <IconButton size="small" edge="start" color="inherit">
                    <Image src="/FNº5.png" alt="Logo de futbol" width={50} height={50} onClick={handleClickRedirect}></Image>
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="home" onClick={handleClickBtnCodigo}>
                    <TextField label="Nombre,codigo o alias evento" variant="outlined" value={codigo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCodigo(e.target.value)} ></TextField>
                    <Search />
                </IconButton>
                <IconButton size="small" edge="end" color="inherit" >
                    <AccountCircle />Acceder
                </IconButton>
                <IconButton size="small" edge="end" color="inherit">
                    <LightMode />Modo
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}