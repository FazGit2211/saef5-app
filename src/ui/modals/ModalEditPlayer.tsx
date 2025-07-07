import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import FormEdit from "../forms/FormEdit";
import { Close } from "@mui/icons-material";


interface PlayerType {
    name: string,
    surname: string,
    phoneNumber: number,
    email: string
};

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

export default function ModalEditPlayer() {
    const [open, setOpen] = useState(false);
    const handleClose = () => { setOpen(false) };
    const handleOpen = () => { setOpen(true) };
    return (
        <>
            <Modal open={open}>
                <Box sx={style}>
                    <FormEdit />
                    <Button variant="contained" onClick={handleClose}><Close /></Button>
                </Box>
            </Modal>
        </>
    )
}