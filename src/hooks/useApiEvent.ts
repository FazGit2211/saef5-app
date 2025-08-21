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

const useApiEvent = (url: string) => {

    const [dataEvent, setDataEvent] = useState(useDefaulValues);
    const [errorEvent, setErrorEvent] = useState<ErrorType>({ errorValue: false, message: "" });
    const [loadingEvent, setLoadingEvent] = useState(false);

    const postEvent = async ({ codigo, date, stadium, players }: EventType) => {
        try {
            setLoadingEvent(true);
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
                setErrorEvent({ errorValue: true, message: "Error POST." });;
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorEvent({ errorValue: true, message: error.message });
            }
        } finally {
            setLoadingEvent(false);
        }
    };

    const getEventByCodigo = async (codigo: string) => {
        try {
            setLoadingEvent(true);
            const options: RequestInit = {
                method: "GET",
                headers: { "content-type": "application/json" },
            };
            const response = await fetch(`${url}/${codigo}`, options);
            if (response.ok) {
                const dataValues: EventGetType = await response.json();
                setDataEvent(dataValues);
            } else {
                const dataInfo = await response.json();
                console.log(dataInfo);
                setErrorEvent({ errorValue: true, message: `${dataInfo.message.info}` });
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorEvent({ errorValue: true, message: error.message });
            };
        } finally {
            setLoadingEvent(false);
        };
    };

    const putEvent = async (idEvent: number, { date }: EventType) => {
        try {
            setLoadingEvent(true);
            const dataValues = { date };
            const options: RequestInit = {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(dataValues)
            };
            const response = await fetch(`${url}/${idEvent}`, options);
            if (response.ok) {
                setErrorEvent({ errorValue: false, message: "Actualizado correctamente." });
            };
            setErrorEvent({ errorValue: true, message: "Error PUT." });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorEvent({ errorValue: true, message: error.message });
            }
        } finally {
            setLoadingEvent(false);
        }
    };

    const deleteEvent = async (id: number) => {
        try {
            setLoadingEvent(true);
            const options: RequestInit = {
                method: "DELETE",
                headers: { "content-type": "application/json" },
            };
            const request = await fetch(`${url}/${id}`, options);
            if (!request.ok) {
                setErrorEvent({ errorValue: true, message: "Error DELETE." });
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorEvent({ errorValue: true, message: error.message });
            };
        } finally {
            setLoadingEvent(false);
        };
    }

    return { dataEvent, loadingEvent, errorEvent, postEvent, getEventByCodigo, putEvent, deleteEvent }
}
export default useApiEvent;