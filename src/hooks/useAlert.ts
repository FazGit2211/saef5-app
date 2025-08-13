import { useState } from "react";

const useAlert = () => {
    //Manejar el estado para los alert de mensajes
    const [alert, setAlert] = useState(false);
    const handleShowAlert = () => { setAlert(true); };
    const handleSetTimeOut = () => {
        setTimeout(() => {
            setAlert(false);
        }, 5000);
    }

    return { alert, handleShowAlert, handleSetTimeOut }

}
export default useAlert;