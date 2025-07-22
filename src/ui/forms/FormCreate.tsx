import PlayersContext from "@/context/PlayersContext";
import useForm from "@/hooks/useForm";
import { Alert, Button, FormGroup, TextField } from "@mui/material";
import { useContext, useState } from "react";

const initialForm = { name: "", surname: "", phoneNumber: 0, email: "" };

export default function FormCreate() {
    //Manejar el estado para los alert de mensajes
    const [sendForm, setSendForm] = useState(false);

    //Llamar al contexto
    const { addPlayers } = useContext(PlayersContext);

    //Llamar al hook personalizado del formulario
    const { form, error, setForm, handleChangeName, handleBlurName, handleChangeSurname, handleBlurSurname, handleChangePhoneNumber, handleBlurPhoneNumber, handleChangeEmail, handleBlurEmail } = useForm({ initialForm });

    const handleSubmit = () => {
        if (!error.errorValue) {
            addPlayers(form);
            setSendForm(true);
            setTimeout(() => {
                setSendForm(false);
                setForm({ name: "", surname: "", phoneNumber: 0, email: "" });
            }, 3000);
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
                {sendForm ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
            </FormGroup>
        </>
    );
}