import { PlayerType } from "@/context/EventContext";
import { useState } from "react";

interface ErrorType {
    errorValue: boolean,
    name: string,
    email: string,
    state: string,
    admin: boolean
}

interface FormType {
    initialForm: PlayerType
};

const useForm = ({ initialForm }: FormType) => {
    //Inicializar form con valores vacios
    const [form, setForm] = useState<PlayerType>(initialForm);
    //Estado para obtener los errores
    const [errorInfo, setErrorInfo] = useState<ErrorType>({ errorValue: false, name: "", email: "", state: "", admin: false });
    //Expreciones regulares
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    //Funciones para detectar el ingreso de datos en los inputs
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form, name: e.target.value.trim()
        });
    };

    const handleBlurName = () => {
        if ((!form.name.trim()) || (!regexName.test(form.name.trim()))) {
            setErrorInfo({
                ...errorInfo, errorValue: true, name: "El nombre no puede estar vacio"
            })
        } else {
            setErrorInfo({ ...errorInfo, errorValue: false, name: "" })
        };
    };

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form, email: e.target.value.trim()
        });
    };

    const handleBlurEmail = () => {
        if ((!form.email.trim()) || (!regexEmail.test(form.email.trim()))) {
            setErrorInfo({ ...errorInfo, errorValue: true, email: "El email no puede estar vacio" })
        } else {
            setErrorInfo({ ...errorInfo, errorValue: false, email: "" })
        }
    };

    const handleChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, state: e.target.value.trim() });
    };

    const handleBlurState = () => {
        if ((!form.state.trim()) || (!regexName.test(form.state.trim()))) {
            setErrorInfo({
                ...errorInfo, errorValue: true, name: "El estado no puede estar vacio"
            })
        } else {
            setErrorInfo({ ...errorInfo, errorValue: false, name: "" })
        };
    };

    const handleCkeckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, admin: e.target.checked })
    };

    return { form, errorInfo, setForm, handleChangeName, handleBlurName, handleChangeEmail, handleBlurEmail, handleChangeState, handleBlurState, handleCkeckBoxChange }
}

export default useForm;