import UserContext from "@/context/UserContext";
import useApiUser from "@/hooks/useApiUser";
import TableEventUser from "@/ui/tables/TableEventUser";
import { Add } from "@mui/icons-material";
import { Alert, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function UserEvent() {
    //Utilizar propiedades e métodos del hook
    const url = "http://localhost:5000/api/user";
    const { dataUser, loadingUser, errorUser, eventUserById } = useApiUser(url);
    //Utilizar el hook del router de next
    const route = useRouter();
    const userId = route.query.id?.toString();
    //Utilizar los métodos e propiedades del contexto
    const { addUser } = useContext(UserContext);
    //Utilizar el hook useEffect para obtener los eventos del usuario
    useEffect(() => {
        if (userId !== undefined) {
            eventUserById(parseInt(userId));
        };
    }, [userId]);
    //Utilizar el hook useEffect para cargar al contexto los eventos del usuario
    useEffect(() => {
        if (dataUser.info.username !== undefined && dataUser.info.username !== "") {
            addUser({ id: dataUser.info.id, username: dataUser.info.username, password: dataUser.info.password, Events: dataUser.info.Events });
        };
    }, [dataUser]);
    //Método para ir a crear un nuevo evento para el usuario registrado
    const handleClickRedirect = () => {
        if (dataUser.info.username !== "") {
            addUser({ id: dataUser.info.id, username: dataUser.info.username, password: dataUser.info.password, Events: dataUser.info.Events });
            route.push('/event/event-new');
        };
    };
    return (
        <>
            {loadingUser ? <Alert variant="filled" severity="info">Cargando...</Alert> : null}
            {dataUser.info.username !== "" ? <Typography variant="h5">Hola usuario {dataUser.info.username}, hemos encontrado éstos eventos:</Typography> : errorUser.message}
            {dataUser.info.Events.length > 0 ? <TableEventUser /> : <Typography variant="h6">No tienes eventos. </Typography>}
            <Button variant="contained" onClick={handleClickRedirect} color="success"><Add />Nuevo evento</Button>
        </>
    );
};