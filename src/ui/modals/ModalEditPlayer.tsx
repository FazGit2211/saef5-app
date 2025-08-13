import { Box, Button, Modal } from "@mui/material";
import FormEdit from "../forms/FormEdit";
import { Close } from "@mui/icons-material";
import { PlayerType } from "@/context/EventContext";

interface PropsType {
    openModal: boolean,
    closeModal: () => void,
    dataEdit: PlayerType,
    indexPlayer: number,
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
    return (
        <>
            <Modal open={openModal}>
                <Box sx={style}>
                    <FormEdit playerEdit={dataEdit} indexPlayerEdit={indexPlayer} />
                    <Button variant="contained" onClick={closeModal}><Close /></Button>
                </Box>
            </Modal>
        </>
    )
}