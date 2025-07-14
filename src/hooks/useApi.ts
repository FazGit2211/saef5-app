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
    date: string,
    stadium: StadiumType,
    players: PlayerType[]
};

interface ErrorType {
    errorValue: boolean,
    message: string
}

const useApi = (url: string) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState<ErrorType>({ errorValue: false, message: "" });
    const [loading, setLoading] = useState(false);

    const postEvent = async ({ date, stadium, players }: EventType) => {
        setLoading(true);
        const data = {
            date, stadium, players
        };

        let options: RequestInit = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                setLoading(true);
                setError({errorValue: false, message: "Enviado correctamente."})
            }
        } catch (error) {
            setError({ errorValue: true, message: "Error al enviar datos." });
        };

    }

    return { loading, error, postEvent }
}
export default useApi;