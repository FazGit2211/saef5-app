import PlayersContext from "@/context/PlayersContext";
import useForm from "@/hooks/useForm";
import { Alert, Button, FormGroup, TextField } from "@mui/material";
import { useContext, useState } from "react";

interface PlayerType {
    name: string,
    surname: string,
    phoneNumber: number,
    email: string
};



const initialForm = { name: "", surname: "", phoneNumber: 0, email: "" };

export default function FormCreate() {
    //Manejar el estado para los alert de mensajes
    const [sendForm, setSendForm] = useState(false);

    //Llamar al contexto
    const { addPlayers } = useContext(PlayersContext);
    //Funcion para validar campos del formulario 
    const validationsForm = (form: PlayerType) => {
        let errors = { errorValue: false, name: "", surname: "", phoneNumber: "", email: "" };
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

        if ((!form.name.trim()) || (!regexName.test(form.name.trim()))) {
            errors.errorValue = true;
            errors.name = "El nombre no puede estar vacio";
        } else {
            errors.errorValue = false;
        };

        if (!form.surname.trim()) {
            errors.errorValue = true;
            errors.surname = "El apellido no puede estar vacio";
        } else {
            if (!regexName.test(form.surname.trim())) {
                errors.surname = "El apellido acepta solo letras y espacios en blanco";
            }
        };

        if (!form.phoneNumber) {
            errors.errorValue = true;
            errors.phoneNumber = "El numero no puede estar vacio";
        };

        if (!form.email.trim()) {
            errors.errorValue = true;
            errors.email = "El email no puede estar vacio";
        } else {
            if (!regexEmail.test(form.email.trim())) {
                errors.email = "El email acepta solo letras y espacios en blanco";
            }
        };

        return errors;
    }
    //Llamar al hook personalizado del formulario
    const { form, error, setForm, handleChangeName, handleBlurName, handleChangeSurname, handleChangePhoneNumber, handleChangeEmail } = useForm({ initialForm, validationsForm });

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
            <TextField label="Apellido" variant="outlined" value={form.surname} onChange={handleChangeSurname} />
            <TextField label="Telefono" variant="outlined" value={form.phoneNumber} onChange={handleChangePhoneNumber} />
            <TextField label="Email" variant="outlined" value={form.email} onChange={handleChangeEmail} />
            <FormGroup>
                <Button variant="contained" onClick={handleSubmit}>ENVIAR</Button>
                {sendForm ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
            </FormGroup>
        </>
    );
}