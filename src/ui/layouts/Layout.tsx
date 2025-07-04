import { ReactNode } from "react";
import NavBar from "../navs/navBar";

interface LayoutProps {
    children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <header>
                <NavBar />
            </header>
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                {children}
            </main>
        </div>
    );
}