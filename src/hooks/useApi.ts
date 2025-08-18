import { PlayerType, StadiumType } from "@/context/EventContext";
import { useState } from "react"

interface EventGetType {
    info: {
        id: number,
        codigo: string,
        date: string,
        Stadium: StadiumType,
        Players: PlayerType[]
    }
};
interface EventType {
    codigo: string,
    date: string,
    stadium: StadiumType,
    players: PlayerType[]
}

interface ErrorType {
    errorValue: boolean,
    message: string
};

const useDefaulValues: EventGetType = { info: { id: 0, codigo: "", date: "", Stadium: { id: 0, name: "", address: "" }, Players: [{ id: 0, name: "", email: "", state: "", admin: false }] } };

const useApi = (url: string) => {

    const [data, setData] = useState(useDefaulValues);
    const [error, setError] = useState<ErrorType>({ errorValue: false, message: "" });
    const [loading, setLoading] = useState(false);

    const postEvent = async ({ codigo, date, stadium, players }: EventType) => {
        try {
            setLoading(true);
            const dataValues = {
                codigo, date, stadium, players
            };
            const options: RequestInit = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(dataValues)
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                setError({ errorValue: true, message: "Error POST." });;
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError({ errorValue: true, message: error.message });
            }
        };
    };

    const getEventByCodigo = async (codigo: string) => {
        try {
            setLoading(true);
            const options: RequestInit = {
                method: "GET",
                headers: { "content-type": "application/json" },
            };
            const response = await fetch(`${url}/${codigo}`, options);
            if (response.ok) {
                const dataValues: EventGetType = await response.json();
                setData(dataValues);
            } else {
                setError({ errorValue: true, message: "Error GET." });
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError({ errorValue: true, message: error.message });
            };
        } finally {
            setLoading(false);
        };
    };

    const putEvent = async (idEvent: number, { date }: EventType) => {
        try {
            setLoading(true);
            const dataValues = { date };
            const options: RequestInit = {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(dataValues)
            };
            const response = await fetch(`${url}/${idEvent}`, options);
            if (response.ok) {
                setError({ errorValue: false, message: "Actualizado correctamente." });
            };
            setError({ errorValue: true, message: "Error PUT." });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError({ errorValue: true, message: error.message });
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteEvent = async (id: number) => {
        try {
            setLoading(true);
            const options: RequestInit = {
                method: "DELETE",
                headers: { "content-type": "application/json" },
            };
            const request = await fetch(`${url}/${id}`, options);
            if (!request.ok) {
                setError({ errorValue: true, message: "Error DELETE." });
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError({ errorValue: true, message: error.message });
            };
        } finally {
            setLoading(false);
        };
    }

    return { data, loading, error, postEvent, getEventByCodigo, putEvent, deleteEvent }
}
export default useApi;