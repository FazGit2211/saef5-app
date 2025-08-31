import { UserType } from "@/context/UserContext";
import { useState } from "react";
interface FormErrorType {
    usernameError: string,
    passwordError: string,
    errorUser: boolean,
};
const useFormUser = () => {
    const [formUser, setUserForm] = useState<UserType>({ id: 0, username: "", password: "", Events: [] });
    const [errorFormUser, setErrorFormUser] = useState<FormErrorType>({ usernameError: "", passwordError: "", errorUser: true });
    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserForm({ ...formUser, username: e.target.value });
    };
    const handleBlurUsername = () => {
        if (!formUser.username.trim()) {
            setErrorFormUser({ ...errorFormUser, errorUser: true, usernameError: "El nombre no debe de estar vacio" });
        } else {
            setErrorFormUser({ ...errorFormUser, errorUser: false, usernameError: "" });
        };
    };
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserForm({ ...formUser, password: e.target.value });
    };
    const handleBlurPassword = () => {
        if (!formUser.password.trim()) {
            setErrorFormUser({ ...errorFormUser, errorUser: true, passwordError: "El campo contraseña no debe de estar vacia" });
        } else {
            setErrorFormUser({ ...errorFormUser, errorUser: false, passwordError: "" });
        };
    };
    return { formUser, errorFormUser, handleChangeUsername, handleChangePassword, handleBlurUsername, handleBlurPassword };
};
export default useFormUser;