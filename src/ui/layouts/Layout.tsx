import { ReactNode } from "react";
import NavBar from "../navs/navBar";
import { Email, LinkedIn } from "@mui/icons-material";
import { Typography } from "@mui/material";

interface LayoutProps {
    children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-200">
            <header className="flex justify-evenly">
                <NavBar />
            </header>
            <main className="flex flex-col flex-grow-1 justify-evenly items-center">
                {children}
            </main>
            <footer className="flex justify-evenly">
                <Typography variant="h6"><Email /> zuletafacundoadolfo2211@gmail.com</Typography><Typography variant="h6"><LinkedIn />linkedin.com/in/facundo-zuleta-/</Typography>
            </footer>
        </div>
    );
}
export default Layout;