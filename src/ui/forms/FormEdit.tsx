import { useState } from "react";
import { Button, FormGroup, TextField } from "@mui/material";
interface FormData {
    name: string,
    surname: string,
    phoneNumber: number,
    email: string
};
export default function FormEdit() {
    const [form, setForm] = useState<FormData>({
        name: "", surname: "", phoneNumber: 0, email: ""
    });

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form, name: e.target.value
        })
    };

    const handleChangeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form, surname: e.target.value
        })
    };

    const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form, phoneNumber: parseInt(e.target.value)
        })
    };

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form, email: e.target.value
        })
    };

    const handleSubmit = () => {
        setForm({ name: '', surname: '', phoneNumber: 0, email: '' });
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
            </FormGroup>
        </>
    )
}