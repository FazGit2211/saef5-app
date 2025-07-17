import { useState } from "react"

interface PlayerType {
    name: string,
    surname: string,
    phoneNumber: number,
    email: string
};

interface StadiumType {
    name: string,
    address: string
};

interface EventType {
    codigo: string,
    date: string,
    stadium: StadiumType,
    players: PlayerType[]
};

interface ErrorType {
    errorValue: boolean,
    message: string
};


const useApi = (url: string) => {

    const [dataInfo, setDataInfo] = useState<EventType>();
    const [error, setError] = useState<ErrorType>({ errorValue: false, message: "" });
    const [loading, setLoading] = useState(false);

    const postEvent = async ({ codigo, date, stadium, players }: EventType) => {
        setLoading(true);
        const dataValues = {
            codigo, date, stadium, players
        };

        let options: RequestInit = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(dataValues)
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                setLoading(true);
                setError({ errorValue: false, message: "Enviado correctamente." })
            }
        } catch (error) {
            setError({ errorValue: true, message: "Error al enviar datos." });
        } finally {
            setLoading(false);
        }

    };

    const getEventByCodigo = async (codigo: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${url}/${codigo}`);
            if (response.ok) {
                const dataValues = await response.json();
                setDataInfo(dataValues);
            }
        } catch (error) {
            setError({ errorValue: true, message: "Error al enviar datos." });
        } finally {
            setLoading(false);
        }
    }

    return { dataInfo, loading, error, postEvent, getEventByCodigo }
}
export default useApi;