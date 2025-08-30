import { StadiumType } from "@/context/EventContext";
import { PlayerType } from "@/context/PlayersContext";
import { useState } from "react"

interface EventGetType {
    info: {
        id: number,
        code: string,
        date: string,
        Stadium: StadiumType,
        Players: PlayerType[],
    }
};
interface EventType {
    code: string,
    date: string,
    stadium: StadiumType,
    players: PlayerType[],
    userId: number
}

interface ErrorType {
    errorValue: boolean,
    message: string
};

const useDefaulValues: EventGetType = { info: { id: 0, code: "", date: "", Stadium: { id: 0, name: "", address: "" }, Players: [{ id: 0, name: "", email: "", state: "", admin: false }] } };

const useApiEvent = (url: string) => {

    const [dataEvent, setDataEvent] = useState(useDefaulValues);
    const [errorEvent, setErrorEvent] = useState<ErrorType>({ errorValue: true, message: "" });
    const [loadingEvent, setLoadingEvent] = useState(false);

    const postEvent = async ({ code, date, stadium, players, userId }: EventType) => {
        try {
            setLoadingEvent(true);
            const dataValues = {
                code, date, stadium, players, userId
            };
            const options: RequestInit = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(dataValues)
            };
            const response = await fetch(url, options);
            if (response.ok) {
                const dataInfo = await response.json();
                setErrorEvent({ errorValue: false, message: `${dataInfo.message}` });
            } else {
                const dataInfo = await response.json();
                setErrorEvent({ errorValue: true, message: `${dataInfo.title}` });
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorEvent({ errorValue: true, message: error.name });
            };
        } finally {
            setLoadingEvent(false);
        }
    };

    const getEventByCode = async (codeEvent: string) => {
        try {
            setLoadingEvent(true);
            const options: RequestInit = {
                method: "GET",
                headers: { "content-type": "application/json" },
            };
            const response = await fetch(`${url}/${codeEvent}`, options);
            if (response.ok) {
                const dataValues: EventGetType = await response.json();
                setDataEvent(dataValues);
            } else {
                const dataInfo = await response.json();
                console.log(dataInfo);
                setErrorEvent({ errorValue: true, message: `${dataInfo.title}` });
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
            } else {
                const dataInfo = await response.json();
                setErrorEvent({ errorValue: true, message: `${dataInfo.message.info}` });
            };
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
            const response = await fetch(`${url}/${id}`, options);
            if (!response.ok) {
                const dataInfo = await response.json();
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

    const getEventByUser = async (idUser: number) => {
        try {
            setLoadingEvent(true);
            const options: RequestInit = {
                method: "GET",
                headers: { "content-type": "application/json" },
            };
            const response = await fetch(`${url}/${idUser}`, options);
            if (response.ok) {
                const dataValues: EventGetType = await response.json();
                setDataEvent(dataValues);
            } else {
                const dataInfo = await response.json();
                setErrorEvent({ errorValue: true, message: `${dataInfo.message.info}` });
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorEvent({ errorValue: true, message: error.message });
            };
        } finally {
            setLoadingEvent(false);
        }
    };

    return { dataEvent, loadingEvent, errorEvent, postEvent, getEventByCode, putEvent, deleteEvent, getEventByUser }
}
export default useApiEvent;