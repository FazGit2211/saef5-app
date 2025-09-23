import { StadiumType } from "@/context/EventContext";
import { Close, Save } from "@mui/icons-material";
import { Alert, Box, Button, FormGroup, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { style } from "./ModalCreatePlayer";
export interface PropsType {
    openModal: boolean,
    closeModal: () => void,
    stadium: StadiumType,
    addStadium: (s: StadiumType) => void
};
const ModalStadium = ({ openModal, closeModal, stadium, addStadium }: PropsType) => {
    //Inicializar form con valores en las props
    const [form, setForm] = useState<StadiumType>({ id: 0, name: stadium.name, address: stadium.address });
    //Manejar el estado para los alert de mensajes
    const [sendForm, setSendForm] = useState(false);
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form, name: e.target.value
        })
    };
    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form, address: e.target.value
        })
    };
    const handleSaveBtn = () => {
        if (form.name.trim() !== "" && form.address.trim() !== "") {
            addStadium(form);
            setSendForm(true);
            setTimeout(() => {
                setSendForm(false);
            }, 3000);
        };
    };
    return (
        <>
            <Modal open={openModal}>
                <Box sx={style}>
                    <Typography variant="h5">Ingrese el lugar y dirección de la cancha:</Typography>
                    <FormGroup>
                        <TextField label="Nombre" variant="outlined" value={form.name} onChange={handleChangeName}></TextField>
                        <TextField label="Direccion" variant="outlined" value={form.address} onChange={handleChangeAddress}></TextField>
                    </FormGroup>
                    <Button variant="contained" onClick={handleSaveBtn} color="success"><Save /></Button>
                    <Button variant="contained" onClick={closeModal} color="warning"><Close /></Button>
                    {sendForm ? <Alert variant="filled" severity="success" color="info">Agregado Correctamente</Alert> : null}
                </Box>
            </Modal>
        </>
    )
}
export default ModalStadium;