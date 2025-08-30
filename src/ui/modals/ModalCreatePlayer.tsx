import { Close } from "@mui/icons-material";
import { Box, Button, Modal } from "@mui/material";
import FormCreate from "../forms/FormCreate";

export interface PropsType {
    openModal: boolean,
    closeModal: () => void,
};
export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalCreatePlayer({ openModal, closeModal }: PropsType) {
    return (
        <Modal open={openModal}>
            <Box sx={style}>
                <FormCreate />
                <Button variant="contained" onClick={closeModal} color="warning"><Close /></Button>
            </Box>
        </Modal>
    )
}