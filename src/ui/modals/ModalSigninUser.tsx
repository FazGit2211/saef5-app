import useApiUser from "@/hooks/useApiUser";
import { Alert, Box, Button, FormGroup, Modal, TextField, Typography } from "@mui/material";
import { PropsType, style } from "./ModalCreatePlayer";
import useFormUser from "@/hooks/useFormUser";
import useAlert from "@/hooks/useAlert";
import { Close, Save } from "@mui/icons-material";
export default function ModalSigninUser({ openModal, closeModal }: PropsType) {
    const { formUser, errorFormUser, handleChangePassword, handleChangeUsername, handleBlurUsername, handleBlurPassword } = useFormUser();
    const url = "https://saf5-api.onrender.com/api/user/signin";
    const { loadingUser, errorUser, signin } = useApiUser(url);
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //Método para verificar la autentificacion
    const handleClickLogin = () => {
        if (!errorFormUser.errorUser) {
            signin({ id: 0, username: formUser.username, password: formUser.password, Events: [] });
            handleShowAlert();
            if (!loadingUser && !errorUser.errorValue) {
                handleSetTimeOut();
            };
        };
    };
    return (
        <>
            <Modal open={openModal}>
                <Box sx={style}>
                    <Typography>Crear nuevo usuario:</Typography>
                    <FormGroup>
                        <TextField label="Nombre" variant="outlined" value={formUser.username} onChange={handleChangeUsername} onBlur={handleBlurUsername} error={errorFormUser.errorUser} helperText={errorFormUser.usernameError} />
                        <TextField label="Contraseña" variant="outlined" value={formUser.password} onChange={handleChangePassword} onBlur={handleBlurPassword} error={errorFormUser.errorUser} helperText={errorFormUser.passwordError} />
                    </FormGroup>
                    <FormGroup>
                        <Typography><Button variant="contained" color="success" onClick={handleClickLogin}><Save /></Button></Typography>
                        <Typography><Button variant="contained" color="info" onClick={closeModal}><Close /></Button></Typography>
                    </FormGroup>
                    {loadingUser ? <Alert variant="filled" severity="info">Enviando...</Alert> : null}
                    {alert && !loadingUser && errorUser.errorValue ? <Alert variant="filled" severity="warning">{errorUser.message}</Alert> : null}
                    {alert && !loadingUser && !errorUser.errorValue ? <Alert variant="filled" severity="success">Creado correctamente</Alert> : null}
                </Box>
            </Modal>
        </>
    );
};