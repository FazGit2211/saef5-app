import FormCreate from "@/ui/forms/FormCreate";
import { Add } from "@mui/icons-material";
import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function PlayerNew() {
    const [open, setOpen] = useState(false);
    const handleClose = () => { setOpen(false) };
    const handleOpen = () => { setOpen(true) };
    return (
        <>
            <h3>Player page</h3>
            <h4>Lista de las personas agregadas</h4>
            <Button variant="contained" onClick={handleOpen}><Add /></Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <FormCreate />
                </Box>
            </Modal>
        </>
    );
}