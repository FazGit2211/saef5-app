import { Box, Button, Modal } from "@mui/material";
import FormEdit from "../forms/FormEdit";
import { Close } from "@mui/icons-material";
import { style } from "./ModalCreatePlayer";
import { PlayerType } from "@/context/PlayersContext";
export interface PropsType {
    openModal: boolean,
    closeModal: () => void,
    dataEdit: PlayerType,
    indexPlayer: number,
};
const ModalEditPlayer = ({ openModal, closeModal, dataEdit, indexPlayer }: PropsType) => {
    return (
        <>
            <Modal open={openModal}>
                <Box sx={style}>
                    <FormEdit playerEdit={dataEdit} indexPlayerEdit={indexPlayer} />
                    <Button variant="contained" onClick={closeModal} color="warning"><Close /></Button>
                </Box>
            </Modal>
        </>
    )
}
export default ModalEditPlayer;