import { useState } from "react";
import { StadiumType } from "@/context/EventContext";
interface ErrorStadiumType {
    errorValue: boolean,
    message: string
};
const useApiStadium = (url: string) => {
    const [dataStadium, setDataStadium] = useState<StadiumType>();
    const [errorStadium, setErrorStadium] = useState<ErrorStadiumType>({ errorValue: false, message: "" });
    const [loadingStadium, setLoadingStadium] = useState(false);

    const getStadium = async (id: number) => {
        try {
            setLoadingStadium(true);
            const options: RequestInit = {
                method: "GET",
                headers: { "content-type": "application/json" },
            };
            const response = await fetch(`${url}/${id}`, options);
            if (response.ok) {
                const dataValues = await response.json();
                setDataStadium(dataValues);
                setErrorStadium({ errorValue: false, message: "Get ok." });
            } else {
                setErrorStadium({ errorValue: true, message: "Error GET." })
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorStadium({ errorValue: true, message: error.message });
            };
        } finally {
            setLoadingStadium(false);
        };
    };

    const putStadium = async ({ id, name, address }: StadiumType) => {
        try {
            setLoadingStadium(true);
            const dataValues = { id, name, address };
            const options: RequestInit = {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(dataValues)
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                setErrorStadium({ errorValue: true, message: "Error PUT." });
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorStadium({ errorValue: true, message: error.message });
            };
        } finally {
            setLoadingStadium(false);
        };
    };
    return { dataStadium, loadingStadium, errorStadium, putStadium, getStadium };
}
export default useApiStadium;