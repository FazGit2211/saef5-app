import { StadiumType } from "@/context/EventContext";
import { Close, Save } from "@mui/icons-material";
import { Alert, Box, Button, FormGroup, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { style } from "./ModalCreatePlayer";
export interface PropsType {
    openModal: boolean,
    closeModal: () => void,
    stadium: StadiumType,
    addStadium: (s: StadiumType) => void
};
export default function ModalStadium({ openModal, closeModal, stadium, addStadium }: PropsType) {
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
        addStadium(form);
        setSendForm(true);
        setTimeout(() => {
            setSendForm(false);
        }, 3000);
    };

    return (
        <>
            <Modal open={openModal}>
                <Box sx={style}>
                    <FormGroup>
                        <TextField label="Nombre" variant="outlined" value={form.name} onChange={handleChangeName}></TextField>
                        <TextField label="Direccion" variant="outlined" value={form.address} onChange={handleChangeAddress}></TextField>
                    </FormGroup>
                    <Button variant="contained" onClick={handleSaveBtn} color="success"><Save /></Button>
                    <Button variant="contained" onClick={closeModal}><Close /></Button>
                    {sendForm ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
                </Box>
            </Modal>
        </>
    )
}