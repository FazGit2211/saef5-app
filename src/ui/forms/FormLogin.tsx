import useAlert from "@/hooks/useAlert";
import useApiUser from "@/hooks/useApiUser";
import useFormUser from "@/hooks/useFormUser";
import useModal from "@/hooks/useModal";
import { Login } from "@mui/icons-material";
import { Alert, Button, Card, CardActions, FormGroup, TextField, Typography } from "@mui/material";
import ModalSinginUser from "../modals/ModalSigninUser";
import { useContext } from "react";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/router";
export default function FormLogin() {
    //Utilizar propiedades e métodos del hook personalizado
    const { formUser, errorFormUser, handleChangePassword, handleChangeUsername, handleBlurUsername, handleBlurPassword } = useFormUser();
    const url = "http://localhost:5000/api/user/login";
    const { loadingUser, errorUser, dataUser, login } = useApiUser(url);
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    const { modalUserSingin, openModalUserSingin, closeModalUserSingin } = useModal();
    //Utilizar el contexto
    const { addUser } = useContext(UserContext);
    //Utilizar el hook router
    const router = useRouter();
    //Método para verificar la autentificacion
    const handleClickLogin = async () => {
        if (!errorFormUser.errorUser) {
            await login({ id: 0, username: formUser.username, password: formUser.password });
            handleShowAlert();
            if (!loadingUser && !errorUser.errorValue) {
                addUser({ id: dataUser.info.id, username: dataUser.info.username, password: dataUser.info.password });
                router.push("/user/user-event-find/user-event");
            };
            handleSetTimeOut();
        };
    };
    const handleClickSingin = () => {
        openModalUserSingin();
    };
    return (
        <>
            <Typography variant="h6">Login para iniciar sesión</Typography>
            <Card>
                <FormGroup>
                    <TextField label="Nombre" variant="outlined" value={formUser.username} onChange={handleChangeUsername} onBlur={handleBlurUsername} error={errorFormUser.errorUser} helperText={errorFormUser.usernameError} />
                    <TextField label="Contraseña" variant="outlined" value={formUser.password} onChange={handleChangePassword} onBlur={handleBlurPassword} error={errorFormUser.errorUser} helperText={errorFormUser.passwordError} />
                </FormGroup>
                <CardActions>
                    <Typography><Button variant="contained" color="success" onClick={handleClickLogin}><Login /></Button></Typography>
                </CardActions>
                {loadingUser ? <Alert variant="filled" severity="info">Verificando</Alert> : null}
                {!loadingUser && errorUser.errorValue ? <Alert variant="filled" severity="warning">{errorUser.message}</Alert> : null}
                {alert && !loadingUser && !errorUser.errorValue ? <Alert variant="filled" severity="success">Autentificado correctamente</Alert> : null}
                {modalUserSingin ? <ModalSinginUser openModal={modalUserSingin} closeModal={closeModalUserSingin} /> : null}
            </Card>
            <Typography><Button variant="contained" color="info" onClick={handleClickSingin}>No tienes cuenta ?</Button></Typography>
        </>
    );
}