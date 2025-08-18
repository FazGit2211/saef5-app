import { AppBar, IconButton, Toolbar } from "@mui/material";
import { AccountCircle, Home, LightMode } from "@mui/icons-material";
import { useRouter } from "next/router";
import Image from "next/image";

export default function NavBar() {
    const router = useRouter();
    const handleClickRedirect = () => {
        router.push('/');
    };
    return (
        <AppBar position="static" color="info">
            <Toolbar className="justify-evenly">
                <IconButton size="small" edge="start" color="inherit">
                    <Image src="/FNº5.png" alt="Logo de futbol" width={50} height={50}></Image>
                </IconButton>
                <IconButton size="small" edge="start" color="inherit" aria-label="home" onClick={handleClickRedirect}>
                    <Home />
                </IconButton>
                <IconButton size="small" edge="end" color="inherit" >
                    <AccountCircle />
                </IconButton>
                <IconButton size="small" edge="end" color="inherit">
                    <LightMode />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}