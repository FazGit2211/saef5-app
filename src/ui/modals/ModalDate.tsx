import { Close, Save } from "@mui/icons-material";
import { Alert, Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";

interface PropsType {
    openModal: boolean,
    closeModal: () => void,
    date: string,
    setDate: (d: string) => void
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
export default function ModalDate({ openModal, closeModal, date, setDate }: PropsType) {
    //Manejar el estado para los alert de mensajes
    const [sendForm, setSendForm] = useState(false);
    const handleSaveBtn = () => {
        setSendForm(true);
        setTimeout(() => {
            setSendForm(false)
        }, 3000);
    }
    return (
        <>
            <Modal open={openModal} sx={style}>
                <Box>
                    <TextField label="Fecha" variant="outlined" value={date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}></TextField>
                    <Button variant="contained" onClick={handleSaveBtn}><Save /></Button>
                    <Button variant="contained" onClick={closeModal}><Close /></Button>
                    {sendForm ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
                </Box>
            </Modal>
        </>
    )
}