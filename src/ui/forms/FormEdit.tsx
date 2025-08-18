import { useContext } from "react";
import { Alert, Button, Checkbox, FormGroup, TextField, Typography } from "@mui/material";
import PlayerContext from "@/context/PlayersContext";
import useForm from "@/hooks/useForm";
import { PlayerType } from "@/context/EventContext";
import useAlert from "@/hooks/useAlert";
import useApiPlayer from "@/hooks/useApiPlayer";

interface PropsFormEditType {
    playerEdit: PlayerType,
    indexPlayerEdit: number,
};

export default function FormEdit({ playerEdit, indexPlayerEdit }: PropsFormEditType) {
    //Inicializar form con los valores segun el jugador a editar
    const initialForm = { id: 0, name: playerEdit.name, email: playerEdit.email, state: playerEdit.state, admin: playerEdit.admin }
    //Utilizar las propiedades e métodos para el hook personalizado del formulario
    const { form, errorInfo, setForm, handleChangeName, handleChangeEmail, handleBlurName, handleBlurEmail, handleChangeState, handleBlurState, handleCkeckBoxChange } = useForm({ initialForm });
    //Utilizar a los alert del hook personalizado
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //Utilizar las propiedades e métodos del hook personalizado del formulario
    const url = "http://localhost:5000/api/player";
    const { putPlayer } = useApiPlayer(url);
    //Llamar al listado actual
    const { players } = useContext(PlayerContext);

    const handleSubmit = () => {
        players.splice(indexPlayerEdit, 1, form);
        if (playerEdit.id !== undefined) {
            putPlayer({ id: playerEdit.id, name: form.name, email: form.email, state: form.state, admin: form.admin });
        }
        handleShowAlert();
        handleSetTimeOut();
        setForm({ id: 0, name: "", email: "", state: "", admin: true });
    }
    return (
        <>
            <FormGroup>
                <TextField label="Nombre" variant="outlined" value={form.name} onChange={handleChangeName} onBlur={handleBlurName} error={errorInfo.errorValue} helperText={errorInfo.name} />
                <TextField label="Email" variant="outlined" value={form.email} onChange={handleChangeEmail} onBlur={handleBlurEmail} error={errorInfo.errorValue} helperText={errorInfo.email} />
                <TextField label="Estado" variant="outlined" value={form.state} onChange={handleChangeState} onBlur={handleBlurState} error={errorInfo.errorValue} helperText={errorInfo.state} />
                <Typography>Administrador para el evento:</Typography>
                <Checkbox onChange={handleCkeckBoxChange} color="success" value={form.admin} />
            </FormGroup>
            <Button variant="contained" onClick={handleSubmit}>ENVIAR</Button>
            {alert ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
        </>
    )
}