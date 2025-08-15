import { PlayerType } from "@/context/EventContext";
import { useState } from "react";
interface ErrorPlayerType {
    errorValue: boolean,
    message: string
};
const useApiPlayer = (url: string) => {

    const [dataPlayer, setDataPlayer] = useState<PlayerType>();
    const [errorPlayer, setErrorPlayer] = useState<ErrorPlayerType>({ errorValue: false, message: "" });
    const [loadingPlayer, setLoadingPlayer] = useState(false);

    const postPlayer = async (idEvent: number, { name, email, state, admin }: PlayerType) => {
        try {
            setLoadingPlayer(true);
            const dataValues = { name, email, state, admin };
            const options: RequestInit = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(dataValues)
            };
            const response = await fetch(`${url}/${idEvent}`, options);
            if (response.ok) {
                setErrorPlayer({ errorValue: false, message: "Creado." });
            };
            setErrorPlayer({ errorValue: true, message: "Error POST." })
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorPlayer({ errorValue: true, message: error.message });
            };
        } finally {
            setLoadingPlayer(false);
        };
    };

    const getPlayer = async (id: number) => {
        try {
            setLoadingPlayer(true);
            const options: RequestInit = {
                method: "GET",
                headers: { "content-type": "application/json" },
            };
            const response = await fetch(`${url}/${id}`, options);
            if (response.ok) {
                const dataValues = await response.json();
                setDataPlayer(dataValues);
                setErrorPlayer({ errorValue: false, message: "Ok." });
            };
            setErrorPlayer({ errorValue: true, message: "Error GET." });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorPlayer({ errorValue: true, message: error.message });
            }
        } finally {
            setLoadingPlayer(false);
        }
    };

    const putPlayer = async ({ id, name, email, state, admin }: PlayerType) => {
        try {
            setLoadingPlayer(true);
            const dataValues = { id, name, email, state, admin };
            const options: RequestInit = {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(dataValues)
            };
            const response = await fetch(url, options);
            if (response.ok) {
                setErrorPlayer({ errorValue: false, message: "Actualizado correctamente." });
            };
            setErrorPlayer({ errorValue: true, message: "Error PUT." });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorPlayer({ errorValue: true, message: error.message });
            }
        } finally {
            setLoadingPlayer(false);
        }
    };

    const deletePlayer = async (id: number) => {
        try {
            setLoadingPlayer(true);
            const options: RequestInit = {
                method: "DELETE",
                headers: { "content-type": "application/json" },
            };
            const request = await fetch(`${url}/${id}`, options);
            if (request.ok) {
                setErrorPlayer({ errorValue: false, message: "Eliminado correctamente" });
            };
            setErrorPlayer({ errorValue: true, message: "Error DELETE." });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorPlayer({ errorValue: true, message: error.message });
            }
        } finally {
            setLoadingPlayer(false);
        }
    };

    return { dataPlayer, loadingPlayer, errorPlayer, postPlayer, putPlayer, getPlayer, deletePlayer }
};
export default useApiPlayer;