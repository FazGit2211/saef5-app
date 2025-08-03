import { Alert, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { PropsDialogType } from "./DeleteEventDialog";
import { Cancel, Save } from "@mui/icons-material";
import { useRouter } from "next/router";
import useApi from "@/hooks/useApi";
import { useContext, useEffect, useState } from "react";
import EventContext from "@/context/EventContext";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function SaveEventUpdate({ openDialog, code, closeDialog }: PropsDialogType) {
    //propiedades e métodos para enviar los datos hacia la api
    const url = "http://localhost:5000/api/event";
    const { putEvent, loading, error } = useApi(url);
    //propiedades e métodos para utilizar el contexto evento
    const { event, stadium, players } = useContext(EventContext);
    //router para re direccionar a otra página
    const router = useRouter();
    //estado para verificar respuesta de la api
    const [response, setResponse] = useState(false);

    const handleSave = () => {
        if (code === undefined) {
            null
        } else {
            const codigo = event.codigo;
            const date = event.date;
            putEvent(code.toString(), { codigo, date, stadium, players });
        }
        //router.push('/');
    };

    useEffect(() => {
        if ((!loading) && (!error.errorValue)) {
            setResponse(true);
        }
    }, [loading])

    return (
        <>
            <Dialog open={openDialog} sx={style}>
                <DialogTitle>Confirmar actualización ?</DialogTitle>
                <DialogActions><Button variant="contained" onClick={handleSave}><Save /></Button></DialogActions>
                <Button variant="contained" onClick={closeDialog}><Cancel /></Button>
                {loading ? <Alert variant="filled" severity="info">Enviando ...</Alert> : null}
                {error.errorValue ? <Alert variant="filled" severity="warning">Error {error.message}</Alert> : null}
                {response ? <Alert variant="filled" severity="success">Actualizado</Alert> : null}
            </Dialog>
        </>
    )
}