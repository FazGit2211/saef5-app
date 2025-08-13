import PlayersContext from "@/context/PlayersContext";
import useAlert from "@/hooks/useAlert";
import useForm from "@/hooks/useForm";
import { Alert, Button, FormGroup, TextField } from "@mui/material";
import { useContext } from "react";

const initialForm = { id: 0, name: "", surname: "", phoneNumber: 0, email: "", state: "" };

export default function FormCreate() {
    //Llamar al contexto
    const { addPlayer } = useContext(PlayersContext);
    //Llamar al hook personalizado del formulario
    const { form, error, setForm, handleChangeName, handleBlurName, handleChangeSurname, handleBlurSurname, handleChangePhoneNumber, handleBlurPhoneNumber, handleChangeEmail, handleBlurEmail } = useForm({ initialForm });
    //Llamr al hook alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    const handleSubmit = () => {
        if (!error.errorValue) {
            addPlayer({ id: 0, name: form.name, surname: form.surname, phoneNumber: form.phoneNumber, email: form.email, state: "" });
            handleShowAlert();
            handleSetTimeOut();
            setForm({ id: 0, name: "", surname: "", phoneNumber: 0, email: "", state: "" });
        }

    };


    return (
        <>
            <TextField label="Nombre" variant="outlined" value={form.name} onChange={handleChangeName} onBlur={handleBlurName} error={error.errorValue} helperText={error.name} />
            <TextField label="Apellido" variant="outlined" value={form.surname} onChange={handleChangeSurname} onBlur={handleBlurSurname} error={error.errorValue} helperText={error.surname} />
            <TextField label="Telefono" variant="outlined" value={form.phoneNumber} onChange={handleChangePhoneNumber} onBlur={handleBlurPhoneNumber} error={error.errorValue} helperText={error.phoneNumber} />
            <TextField label="Email" variant="outlined" value={form.email} onChange={handleChangeEmail} onBlur={handleBlurEmail} error={error.errorValue} helperText={error.email} />
            <FormGroup>
                <Button variant="contained" onClick={handleSubmit}>ENVIAR</Button>
                {alert ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
            </FormGroup>
        </>
    );
}