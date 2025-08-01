import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import { Home } from "@mui/icons-material";

export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                        <MenuIcon></MenuIcon>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{flexGrow:1, display: {xs:'none', sm:'block'}}}>
                        <Home/>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}