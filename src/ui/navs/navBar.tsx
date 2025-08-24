import { AppBar, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import { AccountCircle, Search } from "@mui/icons-material";
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
            router.push(`/event/event-find/${codigo}`);
        };
    };
    const handleClickUserAccount = () => {
        router.push("/user/login-user");
    }
    return (
        <AppBar position="static" color="info">
            <Toolbar className="justify-evenly lg:flex-row md:flex-col sm:flex-col">
                <IconButton size="small" edge="start" color="inherit">
                    <Image src="/FNº5.png" alt="Logo de futbol" width={60} height={60} onClick={handleClickRedirect}></Image>
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="home" onClick={handleClickBtnCodigo}>
                    <TextField label="Nombre,codigo o alias evento" variant="filled" value={codigo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCodigo(e.target.value)} sx={{ backgroundColor: "white" }}></TextField>
                    <Search />
                </IconButton>
                <IconButton size="small" edge="end" color="inherit" onClick={handleClickUserAccount}>
                    <AccountCircle /><Typography variant="h6" sx={{ color: "black" }}>Acceder</Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}