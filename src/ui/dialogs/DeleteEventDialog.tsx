import useAlert from "@/hooks/useAlert";
import { Cancel, Delete } from "@mui/icons-material";
import { Alert, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useRouter } from "next/router";

export interface PropsDialogType {
    openDialog: boolean,
    code: string | string[] | undefined,
    closeDialog: () => void
};

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
export default function DeleteEventDialog({ openDialog, code, closeDialog }: PropsDialogType) {
    //router para re direccionar a otra página
    const router = useRouter();
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();

    const handleDeleted = () => {
        handleShowAlert();
        handleSetTimeOut();
        closeDialog();
        //router.push('/');
    }
    return (
        <>
            <Dialog open={openDialog} sx={style}>
                <DialogTitle>
                    Eliminar Evento ?
                </DialogTitle>
                <DialogActions>
                    <Button variant="contained" onClick={handleDeleted}><Delete /></Button>
                    <Button variant="contained" onClick={closeDialog}><Cancel /></Button>
                    {alert ? <Alert variant="filled" severity="success"></Alert> : null}
                </DialogActions>
            </Dialog>
        </>
    );
}