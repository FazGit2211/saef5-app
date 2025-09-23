import PlayersContext from "@/context/PlayersContext";
import useAlert from "@/hooks/useAlert";
import useForm from "@/hooks/useForm";
import { Save } from "@mui/icons-material";
import { Alert, Button, Checkbox, FormGroup, TextField, Typography } from "@mui/material";
import { useContext } from "react";

const initialForm = { id: 0, name: "", email: "", state: "", admin: true };

const FormCreate = () => {
    //Llamar al contexto
    const { addPlayer } = useContext(PlayersContext);
    //Llamar al hook personalizado del formulario
    const { form, errorInfo, setForm, handleChangeName, handleBlurName, handleChangeEmail, handleChangeState, handleCkeckBoxChange } = useForm({ initialForm });
    //Llamr al hook alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    const handleSubmit = () => {
        if (!errorInfo.errorValue) {
            addPlayer({ id: 0, name: form.name, email: form.email, state: "", admin: true });
            handleShowAlert();
            handleSetTimeOut();
            setForm({ id: 0, name: "", email: "", state: "", admin: true });
        };
    };
    return (
        <>
            <Typography variant="h5">Ingrese los datos de los participantes:</Typography>
            <FormGroup>
                <TextField label="Nombre" variant="outlined" value={form.name} onChange={handleChangeName} onBlur={handleBlurName} error={errorInfo.errorValue} helperText={errorInfo.name} />
                <TextField label="Email (Opcional)" variant="outlined" value={form.email} onChange={handleChangeEmail} />
                <TextField label="Estado de confirmación (Opcional)" variant="outlined" value={form.state} onChange={handleChangeState} />
                <Typography>Administrador para el evento:</Typography>
                <Checkbox onChange={handleCkeckBoxChange} color="success" value={form.admin} />
            </FormGroup>
            <Button variant="contained" onClick={handleSubmit} color="success"><Save /></Button>
            {alert ? <Alert variant="filled" severity="info">Agregado Correctamente</Alert> : null}
        </>
    );
}
export default FormCreate;