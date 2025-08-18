import { Close, Save } from "@mui/icons-material";
import { Alert, Box, Button, FormGroup, Modal, TextField } from "@mui/material";
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
            <Modal open={openModal} sx={style}>
                <Box>
                    <TextField label="Fecha" variant="outlined" value={date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}></TextField>
                    <FormGroup>
                        <Button variant="contained" onClick={handleSaveBtn}><Save /></Button>
                        <Button variant="contained" onClick={closeModal}><Close /></Button>
                    </FormGroup>
                    {sendForm ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
                </Box>
            </Modal>
        </>
    )
}