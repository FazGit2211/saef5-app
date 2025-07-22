import { useState } from "react";
interface PlayerType {
    name: string,
    surname: string,
    phoneNumber: number,
    email: string
};

interface ErrorType {
    errorValue: boolean,
    name: string,
    surname: string,
    phoneNumber: string,
    email: string
}

interface FormType {
    initialForm: PlayerType
};

const useForm = ({ initialForm }: FormType) => {
    //Inicializar form con valores vacios
    const [form, setForm] = useState<PlayerType>(initialForm);
    //Estado para obtener los errores
    const [error, setError] = useState<ErrorType>({ errorValue: false, name: "", surname: "", phoneNumber: "", email: "" });
    //Expreciones regulares
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    //Funciones para detectar el ingreso de datos en los inputs
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        setForm({
            ...form, name: e.target.value
        })
    };

    const handleBlurName = () => {
        if ((!form.name.trim()) || (!regexName.test(form.name.trim()))) {
            setError({
                ...error, errorValue: true, name: "El nombre no puede estar vacio"
            })
        } else {
            setError({ ...error, errorValue: false, name: "" })
        };
    };

    const handleChangeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form, surname: e.target.value
        })
    };

    const handleBlurSurname = () => {
        if ((!form.surname.trim()) || (!regexName.test(form.surname.trim()))) {
            setError({
                ...error, errorValue: true, surname: "El apellido no puede estar vacio"
            });
        } else {
            setError({ ...error, errorValue: false, surname: "" })
        }
    };

    const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form, phoneNumber: parseInt(e.target.value)
        })
    };

    const handleBlurPhoneNumber = () => {
        if (!form.phoneNumber) {
            setError({ ...error, errorValue: true, phoneNumber: "El numero no puede estar vacio" })
        } else {
            setError({ ...error, errorValue: false, phoneNumber: "" })
        }
    };

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form, email: e.target.value
        })
    };

    const handleBlurEmail = () => {
        if ((!form.email.trim()) || (!regexEmail.test(form.email.trim()))) {
            setError({ ...error, errorValue: true, email: "El email no puede estar vacio" })
        } else {
            setError({ ...error, errorValue: false, email:"" })
        }
    }

    return { form, error, setForm, handleChangeName, handleBlurName, handleChangeSurname, handleBlurSurname, handleChangePhoneNumber, handleBlurPhoneNumber, handleChangeEmail, handleBlurEmail }
}

export default useForm;