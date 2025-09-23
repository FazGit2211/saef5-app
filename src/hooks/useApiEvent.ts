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
    },
    title: string,
    message: string,
    statusCode: number
};
interface EventType {
    code: string,
    date: string,
    stadium: StadiumType,
    players: PlayerType[],
    userId: number
}

const useApiEvent = (url: string) => {

    const useDefaulValues: EventGetType = { info: { id: 0, code: "", date: "", Stadium: { id: 0, name: "", address: "" }, Players: [{ id: 0, name: "", email: "", state: "", admin: false }] }, title: "", message: "", statusCode: 0 };
    const [dataEvent, setDataEvent] = useState<EventGetType>(useDefaulValues);
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
            const data: EventGetType = await response.json();
            setDataEvent(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setDataEvent({ info: { id: 0, code: "", date: "", Stadium: { id: 0, name: "", address: "" }, Players: [{ id: 0, name: "", email: "", state: "", admin: false }] }, title: error.name, message: error.message, statusCode: 500 });
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
            const data: EventGetType = await response.json();
            setDataEvent(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setDataEvent({ info: { id: 0, code: "", date: "", Stadium: { id: 0, name: "", address: "" }, Players: [{ id: 0, name: "", email: "", state: "", admin: false }] }, title: error.name, message: error.message, statusCode: 500 });
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
            const data: EventGetType = await response.json();
            setDataEvent(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setDataEvent({ info: { id: 0, code: "", date: "", Stadium: { id: 0, name: "", address: "" }, Players: [{ id: 0, name: "", email: "", state: "", admin: false }] }, title: error.name, message: error.message, statusCode: 500 });
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
            const data: EventGetType = await response.json();
            setDataEvent(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setDataEvent({ info: { id: 0, code: "", date: "", Stadium: { id: 0, name: "", address: "" }, Players: [{ id: 0, name: "", email: "", state: "", admin: false }] }, title: error.name, message: error.message, statusCode: 500 });
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
            const data: EventGetType = await response.json();
            setDataEvent(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setDataEvent({ info: { id: 0, code: "", date: "", Stadium: { id: 0, name: "", address: "" }, Players: [{ id: 0, name: "", email: "", state: "", admin: false }] }, title: error.name, message: error.message, statusCode: 500 });
            };
        } finally {
            setLoadingEvent(false);
        }
    };

    return { dataEvent, loadingEvent, postEvent, getEventByCode, putEvent, deleteEvent, getEventByUser }
}
export default useApiEvent;