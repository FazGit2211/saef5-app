'use client'
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/router";
export default function CardContainer() {
    const router = useRouter();

    const handleClickRedirect = () => {
        router.push('event/event-new');
    }

    return (
        <>
            <Button variant="contained" onClick={handleClickRedirect}><Add /></Button>
        </>
    );
}