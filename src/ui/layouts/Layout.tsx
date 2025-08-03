import { ReactNode } from "react";
import NavBar from "../navs/navBar";
import { Email, LinkedIn } from "@mui/icons-material";

interface LayoutProps {
    children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex">
                <NavBar />
            </header>
            <main className="flex flex-col flex-grow-1 m-1 items-center">
                {children}
            </main>
            <footer className="flex">
                <ul><li><Email /> zuletafacundoadolfo2211@gmail.com</li> <li><LinkedIn /></li></ul>
            </footer>
        </div>
    );
}