import { useContext, useState } from "react";
import { Alert, Button, FormGroup, TextField } from "@mui/material";
import PlayerContext from "@/context/PlayersContext";
import useForm from "@/hooks/useForm";

interface PlayerType {
    name: string,
    surname: string,
    phoneNumber: number,
    email: string
};

interface PropsType {
    playerEdit: PlayerType,
    indexPlayerEdit: number
};

interface FormType {
    initialForm: PlayerType,
    validationsForm: () => void
};



export default function FormEdit({ playerEdit, indexPlayerEdit }: PropsType) {
    //Inicializar form con los valores segun el jugador a editar
    const defaultValues: FormType = {
        initialForm: { name: playerEdit.name, surname: playerEdit.surname, phoneNumber: playerEdit.phoneNumber, email: playerEdit.email },
        validationsForm: () => { }
    }
    const {form, setForm, handleChangeName, handleChangeSurname, handleChangePhoneNumber, handleChangeEmail} = useForm(defaultValues);
    //Manejar el estado para los alert de mensajes
    const [sendForm, setSendForm] = useState(false);
    //Llamar al listado actual
    const { players } = useContext(PlayerContext);

    const handleSubmit = () => {
        players.splice(indexPlayerEdit, 1, form);
        setSendForm(true);
        setTimeout(() => {
            setSendForm(false);
            setForm({name:"",surname:"",phoneNumber:0,email:""});
        }, 3000)
    }

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
    )
}