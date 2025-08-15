import { Box, Button, Modal } from "@mui/material";
import FormEdit from "../forms/FormEdit";
import { Close } from "@mui/icons-material";
import { PlayerType } from "@/context/EventContext";
import { style } from "./ModalCreatePlayer";

export interface PropsType {
    openModal: boolean,
    closeModal: () => void,
    dataEdit: PlayerType,
    indexPlayer: number,
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