import { ReactNode } from "react";
import NavBar from "../navs/navBar";
import { Email, LinkedIn } from "@mui/icons-material";
import { Typography } from "@mui/material";

interface LayoutProps {
    children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex justify-evenly">
                <NavBar />
            </header>
            <main className="flex flex-col flex-grow-1 m-1 items-center">
                {children}
            </main>
            <footer className="flex">
                <ul><li><Typography><Email /> zuletafacundoadolfo2211@gmail.com</Typography></li> <li><Typography><LinkedIn />linkedin.com/in/facundo-zuleta-/</Typography></li></ul>
            </footer>
        </div>
    );
}