import { Close, Save } from "@mui/icons-material";
import { Alert, Box, Button, Checkbox, FormGroup, Modal, TextField, Typography } from "@mui/material";
import { style } from "./ModalCreatePlayer";
import { PropsType } from "./ModalEditPlayer";
import useAlert from "@/hooks/useAlert";
import useApiPlayer from "@/hooks/useApiPlayer";
import { useContext } from "react";
import PlayerContext from "@/context/PlayersContext";
import useForm from "@/hooks/useForm";

export default function ModalEditPlayerEvent({ openModal, closeModal, dataEdit, indexPlayer }: PropsType) {
    //Inicializar form con los valores segun el jugador a editar
    const initialForm = { id: 0, name: dataEdit.name, email: dataEdit.email, state: dataEdit.state, admin: dataEdit.admin }
    //Utilizar las propiedades e métodos para el hook personalizado del formulario
    const { form, errorInfo, setForm, handleChangeName, handleChangeEmail, handleBlurName, handleBlurEmail, handleChangeState, handleBlurState, handleCkeckBoxChange } = useForm({ initialForm });
    //Utilizar a los alert del hook personalizado
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //Utilizar las propiedades e métodos del hook personalizado del formulario
    const url = "http://localhost:5000/api/player";
    const { loadingPlayer, errorPlayer, putPlayer } = useApiPlayer(url);
    //Llamar al listado actual
    const { players } = useContext(PlayerContext);
    const handleSubmit = () => {
        if (dataEdit.id !== undefined) {
            putPlayer({ id: dataEdit.id, name: form.name, email: form.email, state: form.state, admin: form.admin });
        };
        if (!loadingPlayer && !errorPlayer.errorValue) {
            players.splice(indexPlayer, 1, form);
            handleShowAlert();
            handleSetTimeOut();
            setForm({ id: 0, name: "", email: "", state: "", admin: true });
        };
    };
    return (
        <Modal open={openModal}>
            <Box sx={style}>
                <FormGroup>
                    <TextField label="Nombre" variant="outlined" value={form.name} onChange={handleChangeName} onBlur={handleBlurName} error={errorInfo.errorValue} helperText={errorInfo.name} />
                    <TextField label="Email" variant="outlined" value={form.email} onChange={handleChangeEmail} />
                    <TextField label="Estado" variant="outlined" value={form.state} onChange={handleChangeState} onBlur={handleBlurState} error={errorInfo.errorValue} helperText={errorInfo.state} />
                    <Typography>Administrador para el evento:</Typography>
                    <Checkbox onChange={handleCkeckBoxChange} color="success" value={form.admin} />
                </FormGroup>
                <Button variant="contained" onClick={handleSubmit} color="info"><Save /></Button>
                <Button variant="contained" onClick={closeModal} color="warning"><Close /></Button>
                {loadingPlayer ? <Alert variant="filled" severity="success">Actualizando... </Alert> : null}
                {alert && !loadingPlayer && errorPlayer.errorValue ? <Alert variant="filled" severity="warning">{errorPlayer.message}</Alert> : null}
                {alert && !loadingPlayer && !errorPlayer.errorValue ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
            </Box>
        </Modal>
    )
}