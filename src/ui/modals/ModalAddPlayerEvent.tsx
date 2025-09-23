import { Alert, Box, Button, Checkbox, FormGroup, Modal, TextField, Typography } from "@mui/material";
import { PropsType, style } from "./ModalCreatePlayer";
import { Close, Save } from "@mui/icons-material";
import { useContext } from "react";
import PlayersContext from "@/context/PlayersContext";
import useAlert from "@/hooks/useAlert";
import useForm from "@/hooks/useForm";
import useApiPlayer from "@/hooks/useApiPlayer";
import EventContext from "@/context/EventContext";
const initialForm = { id: 0, name: "", email: "", state: "", admin: true };
const ModalAddPlayerEvent = ({ openModal, closeModal }: PropsType) => {
    //Utilizar las propiedades e métodos del contexto
    const { event } = useContext(EventContext);
    const { addPlayer } = useContext(PlayersContext);
    //Utilizar las propiedades e métodos del hook personalizado del formulario
    const { form, errorInfo, setForm, handleChangeName, handleBlurName, handleChangeEmail, handleChangeState, handleCkeckBoxChange } = useForm({ initialForm });
    //Utilizar las propiedades e métodos del hook alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //utilizar el hook personalizado para eliminar un jugador
    const url = "https://saf5-api.onrender.com/api/player";
    const { loadingPlayer, errorPlayer, postPlayer } = useApiPlayer(url);
    const handleSubmit = () => {
        if (!errorInfo.errorValue) {
            postPlayer(event.id, { id: 0, name: form.name, email: form.email, state: "", admin: form.admin });
        };
        if (errorPlayer.errorValue == false) {
            addPlayer({ id: 0, name: form.name, email: form.email, state: "", admin: form.admin });
            handleShowAlert();
            handleSetTimeOut();
            setForm({ id: 0, name: "", email: "", state: "", admin: true });
        };
    };
    return (
        <Modal open={openModal}>
            <Box sx={style}>
                <TextField label="Nombre" variant="outlined" value={form.name} onChange={handleChangeName} onBlur={handleBlurName} error={errorInfo.errorValue} helperText={errorInfo.name} />
                <TextField label="Email (Opcional)" variant="outlined" value={form.email} onChange={handleChangeEmail} />
                <TextField label="Estado de confirmación (Opcional)" variant="outlined" value={form.state} onChange={handleChangeState} />
                <Typography>Administrador para el evento:</Typography>
                <Checkbox checked={form.admin} onChange={handleCkeckBoxChange} color="success" />
                <FormGroup>
                    <Button variant="contained" onClick={handleSubmit} color="success"><Save /></Button>
                    {loadingPlayer ? <Alert variant="filled" severity="info">Agregando...</Alert> : null}
                    {!loadingPlayer && errorPlayer.errorValue ? <Alert variant="filled" severity="info">{errorPlayer.message}</Alert> : null}
                    {(alert && !loadingPlayer && !errorPlayer.errorValue) ? <Alert variant="filled" severity="success">Agregado correctamente.</Alert> : null}
                </FormGroup>
                <Button variant="contained" onClick={closeModal} color="warning"><Close /></Button>
            </Box>
        </Modal>
    )
}
export default ModalAddPlayerEvent;