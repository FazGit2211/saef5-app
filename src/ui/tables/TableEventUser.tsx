import UserContext from "@/context/UserContext";
import useAlert from "@/hooks/useAlert";
import useApiEvent from "@/hooks/useApiEvent";
import { Delete, Edit } from "@mui/icons-material";
import { Alert, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";
export default function TableEventUser() {
    //Utilizar los métodos e propiedades del contexto
    const { user, removeEventUser } = useContext(UserContext);
    //utilizar el hook personalizado para realizar las peticiones a la api
    const url = "http://localhost:5000/api/event";
    const { loadingEvent, errorEvent, deleteEvent } = useApiEvent(url);
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //Utilizar el hook del router de next
    const router = useRouter();
    //Método para redireccionar
    const handleClickBtnUpdate = (codigoEvent: string) => { router.push(`/event/event-find/${codigoEvent}`) };
    const handleClickBtnDelete = (eventId: number, indexElem: number) => {
        deleteEvent(eventId);
        handleShowAlert();
        if (!errorEvent.errorValue) {
            removeEventUser(indexElem);
            handleSetTimeOut();
        };
    };
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Codigo del evento</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {user.Events.map((elem, index) => (<TableRow key={elem.id}><TableCell>{elem.codigo}</TableCell><TableCell>{elem.date}</TableCell><TableCell><Button variant="contained" onClick={() => handleClickBtnUpdate(elem.codigo)}><Edit />Actualizar</Button><Button variant="contained" onClick={() => handleClickBtnDelete(elem.id, index)} color="warning"><Delete />Eliminar</Button></TableCell></TableRow>))}
                    {alert && !loadingEvent && !errorEvent.errorValue ? <Alert variant="filled" severity="success">Eliminado</Alert> : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
};