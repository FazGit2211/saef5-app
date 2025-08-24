import { Close, Save } from "@mui/icons-material";
import { Alert, Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { style } from "./ModalCreatePlayer";
interface PropsType {
    openModal: boolean,
    closeModal: () => void,
    date: string,
    setDate: (d: string) => void
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
            <Modal open={openModal}>
                <Box sx={style}>
                    <Typography variant="h5">Ingrese la fecha del evento a realizarse:</Typography>
                    <TextField label="Fecha" variant="outlined" value={date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}></TextField>
                    <Button variant="contained" onClick={handleSaveBtn} color="success"><Save /></Button>
                    <Button variant="contained" onClick={closeModal} color="info"><Close /></Button>
                    {sendForm ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
                </Box>
            </Modal>
        </>
    )
}