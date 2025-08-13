import { PlayerType } from "@/context/EventContext";
import { useState } from "react";
import { ErrorType } from "./useApi";

const useApiPlayer = (url: string) => {

    const [data, setData] = useState<PlayerType>();
    const [error, setError] = useState<ErrorType>({ errorValue: false, message: "" });
    const [loading, setLoading] = useState(false);

    const postPlayer = async (codeEvent: string, { name, surname, phoneNumber, email, state }: PlayerType) => {
        const dataValues = { name, surname, phoneNumber, email, state };
        const options: RequestInit = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(dataValues)
        };
        try {
            const response = await fetch(`${url}/${codeEvent}`, options);
            if (response.ok) {
                setLoading(true);
                setError({ errorValue: false, message: "Enviado correctamente." })
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError({ errorValue: true, message: error.message });
            }
        };
    };

    const getPlayer = async (id: number) => {
        const options: RequestInit = {
            method: "GET",
            headers: { "content-type": "application/json" },
        };
        try {
            setLoading(true);
            const response = await fetch(`${url}/${id}`, options);
            if (response.ok) {
                const dataValues = await response.json();
                setData(dataValues);
                setError({ errorValue: false, message: "Ok." });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError({ errorValue: true, message: error.message });
            }
        } finally {
            setLoading(false);
        }
    };

    const putPlayer = async (id: number, { name, surname, phoneNumber, email, state }: PlayerType) => {
        const dataValues = { name, surname, phoneNumber, email, state };
        const options: RequestInit = {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(dataValues)
        };

        try {
            const response = await fetch(`${url}/${id}`, options);
            if (response.ok) {
                setLoading(true);
                setError({ errorValue: false, message: "Actualizado correctamente." });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError({ errorValue: true, message: error.message });
            }
        } finally {
            setLoading(false);
        }
    };

    const deletePlayer = async (id: number) => {
        const options: RequestInit = {
            method: "DELETE",
            headers: { "content-type": "application/json" },
        };
        try {
            setLoading(true);
            const request = await fetch(`${url}/${id}`, options);
            if (request.ok) {
                setError({ errorValue: false, message: "Eliminado correctamente" });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError({ errorValue: true, message: error.message });
            }
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, postPlayer, putPlayer, getPlayer, deletePlayer }
};
export default useApiPlayer;