import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { AccountCircle, Home, LightMode } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function NavBar() {
    const router = useRouter();
    const handleClickRedirect = () => {
        router.push('/');
    };
    return (
        <AppBar position="static">
            <Toolbar className="justify-evenly">
                <IconButton size="large" edge="start" color="inherit" aria-label="home" onClick={handleClickRedirect}>
                    <Home />
                </IconButton>
                <IconButton size="large" edge="end" color="inherit" >
                    <AccountCircle />
                </IconButton>
                <IconButton size="large" edge="end" color="inherit">
                    <LightMode />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}