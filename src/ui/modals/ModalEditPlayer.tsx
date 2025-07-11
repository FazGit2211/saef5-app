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

interface PropsType {
    openModal: boolean,
    closeModal: () => void,
    dataEdit: PlayerType,
    indexPlayer: number
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

export default function ModalEditPlayer({ openModal, closeModal, dataEdit, indexPlayer }: PropsType) {
    const [open, setOpen] = useState(openModal);
    return (
        <>
            <Modal open={open}>
                <Box sx={style}>
                    <FormEdit playerEdit={dataEdit} indexPlayerEdit={indexPlayer}/>
                    <Button variant="contained" onClick={closeModal}><Close /></Button>
                </Box>
            </Modal>
        </>
    )
}