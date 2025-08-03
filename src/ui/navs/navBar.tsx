import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { AccountCircle, Home } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function NavBar() {
    const router = useRouter();
    const handleClickRedirect = () => {
        router.push('event/event-new');
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="home" onClick={handleClickRedirect}>
                        <Home />
                    </IconButton>
                    <IconButton size="large" edge="end" color="inherit" >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}