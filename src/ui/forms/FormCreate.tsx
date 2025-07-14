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

interface FormType {
    initialForm: PlayerType,
    validationsForm: () => void
};

const defaultValues: FormType = {
    initialForm: { name: "", surname: "", phoneNumber: 0, email: "" },
    validationsForm: () => { }
}
export default function FormCreate() {
    //Manejar el estado para los alert de mensajes
    const [sendForm, setSendForm] = useState(false);
    //Llamar al contexto
    const { addPlayers } = useContext(PlayersContext);
    //Llamar al hook personalizado del formulario
    const { form, setForm, handleChangeName, handleChangeSurname, handleChangePhoneNumber, handleChangeEmail } = useForm(defaultValues);

    const handleSubmit = () => {
        addPlayers(form);
        setSendForm(true);
        setTimeout(() => {
            setSendForm(false);
            setForm({name:"",surname:"",phoneNumber:0,email:""});
        }, 3000);
        
    };

    return (
        <>
            <FormGroup>
                <TextField label="Nombre" variant="outlined" value={form.name} onChange={handleChangeName} />
                <TextField label="Apellido" variant="outlined" value={form.surname} onChange={handleChangeSurname} />
                <TextField label="Telefono" variant="outlined" value={form.phoneNumber} onChange={handleChangePhoneNumber} />
                <TextField label="Email" variant="outlined" value={form.email} onChange={handleChangeEmail} />
            </FormGroup>
            <FormGroup>
                <Button variant="contained" onClick={handleSubmit}>ENVIAR</Button>
                {sendForm ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null}
            </FormGroup>
        </>
    );
}