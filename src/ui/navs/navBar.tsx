import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { AccountCircle, Search } from "@mui/icons-material";
import { useRouter } from "next/router";
import Image from "next/image";

const NavBar = () => {
    const router = useRouter();
    const handleClickRedirect = () => {
        router.push('/');
    };
    const handleClickBtnSearch = () => {
        router.push("/event/event-find");
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
                <IconButton size="small" edge="start" color="inherit" aria-label="home" onClick={handleClickBtnSearch}>
                    <Search />
                    <Typography variant="h6" color="inherit">Buscar</Typography>
                </IconButton>
                <IconButton size="small" edge="end" color="inherit" onClick={handleClickUserAccount}>
                    <AccountCircle /><Typography variant="h6" color="inherit">Acceder</Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
export default NavBar;