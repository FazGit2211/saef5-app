import { useState } from "react";
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

const useForm = ({ initialForm }: FormType) => {
    //Inicializar form con valores vacios
    const [form, setForm] = useState<PlayerType>(initialForm);
    //Estado para obtener los errores
    const [error, setError] = useState({});

    //Funciones para detectar el ingreso de datos en los inputs
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

    return { form, setForm, handleChangeName, handleChangeSurname, handleChangePhoneNumber, handleChangeEmail }
}

export default useForm;