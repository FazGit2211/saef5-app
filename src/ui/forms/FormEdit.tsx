import { useContext, useState } from "react";
import { Alert, Button, FormGroup, TextField } from "@mui/material";
import PlayerContext from "@/context/PlayersContext";
import useForm from "@/hooks/useForm";
import { PlayerType } from "@/context/EventContext";
import useAlert from "@/hooks/useAlert";
import useApiPlayer from "@/hooks/useApiPlayer";

interface PropsType {
    playerEdit: PlayerType,
    indexPlayerEdit: number,
    code: string
};

export default function FormEdit({ playerEdit, indexPlayerEdit, code }: PropsType) {
    //Inicializar form con los valores segun el jugador a editar
    const initialForm = { name: playerEdit.name, surname: playerEdit.surname, phoneNumber: playerEdit.phoneNumber, email: playerEdit.email, state: playerEdit.state }
    //Utilizar las propiedades e métodos para el hook personalizado del formulario
    const { form, error, setForm, handleChangeName, handleChangeSurname, handleChangePhoneNumber, handleChangeEmail, handleBlurName, handleBlurSurname, handleBlurPhoneNumber, handleBlurEmail, handleChangeState, handleBlurState } = useForm({ initialForm });
    //Utilizar a los alert del hook personalizado
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //Utilizar las propiedades e métodos del hook personalizado del formulario
    const url = "http://localhost:5000/api/player";
    const { putPlayer } = useApiPlayer(url);
    //Llamar al listado actual
    const { players } = useContext(PlayerContext);

    const handleSubmit = () => {
        players.splice(indexPlayerEdit, 1, form);
        if (code.trim() !== undefined || code.trim() !== "") {
            putPlayer(code, { name: form.name, surname: form.surname, phoneNumber: form.phoneNumber, email: form.email, state: form.state });
        }
        handleShowAlert();
        handleSetTimeOut();
        setForm({ name: "", surname: "", phoneNumber: 0, email: "", state: "" });
    }

    return (
        <>
            <FormGroup>
                <TextField label="Nombre" variant="outlined" value={form.name} onChange={handleChangeName} onBlur={handleBlurName} error={error.errorValue} helperText={error.name} />
                <TextField label="Apellido" variant="outlined" value={form.surname} onChange={handleChangeSurname} onBlur={handleBlurSurname} error={error.errorValue} helperText={error.surname} />
                <TextField label="Telefono" variant="outlined" value={form.phoneNumber} onChange={handleChangePhoneNumber} onBlur={handleBlurPhoneNumber} error={error.errorValue} helperText={error.phoneNumber} />
                <TextField label="Email" variant="outlined" value={form.email} onChange={handleChangeEmail} onBlur={handleBlurEmail} error={error.errorValue} helperText={error.email} />
                <TextField label="Estado" variant="outlined" value={form.state} onChange={handleChangeState} onBlur={handleBlurState} error={error.errorValue} helperText={error.state}></TextField>
            </FormGroup>
            <FormGroup>
                <Button variant="contained" onClick={handleSubmit}>ENVIAR</Button>
                {alert ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
            </FormGroup>
        </>
    )
}