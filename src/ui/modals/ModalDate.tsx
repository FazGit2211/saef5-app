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
const ModalDate = ({ openModal, closeModal, date, setDate }: PropsType) => {
    //Manejar el estado para los alert de mensajes
    const [sendForm, setSendForm] = useState(false);
    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => { setDate(e.target.value) };
    const handleSaveBtn = () => {
        if (date.trim() !== "") {
            setSendForm(true);
            setTimeout(() => {
                setSendForm(false)
            }, 3000);
        };
    };
    return (
        <>
            <Modal open={openModal}>
                <Box sx={style}>
                    <Typography variant="h5">Ingrese la fecha del evento a realizarse:</Typography>
                    <TextField label="Fecha" variant="outlined" value={date} onChange={handleChangeDate}></TextField>
                    <Button variant="contained" onClick={handleSaveBtn} color="success"><Save /></Button>
                    <Button variant="contained" onClick={closeModal} color="warning"><Close /></Button>
                    {sendForm ? <Alert variant="filled" severity="info">Agregado Correctamente</Alert> : null}
                </Box>
            </Modal>
        </>
    )
}
export default ModalDate;