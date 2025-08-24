import { UserType } from "@/context/UserContext";
import { useState } from "react";
interface UserGetType {
    message: string,
    info: UserType,
}
interface ErrorUserType {
    errorValue: boolean,
    message: string
};
const useDefaulValues: UserGetType = { message: "", info: { id: 0, username: "", password: "" } };
const useApiUser = (url: string) => {
    const [dataUser, setDataUser] = useState(useDefaulValues);
    const [errorUser, setErrorUser] = useState<ErrorUserType>({ errorValue: false, message: "" });
    const [loadingUser, setLoadingUser] = useState(false);
    const login = async ({ username, password }: UserType) => {
        try {
            setLoadingUser(true);
            const dataValues = { username, password };
            const options: RequestInit = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(dataValues)
            };
            const response = await fetch(url, options);
            if (response.ok) {
                const dataInfo: UserGetType = await response.json();
                setDataUser(dataInfo);
            } else {
                const dataInfo = await response.json();
                setErrorUser({ errorValue: true, message: `${dataInfo.message.info}` });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorUser({ errorValue: true, message: error.message });
            };
        } finally {
            setLoadingUser(false);
        };
    };
    const signin = async ({ username, password }: UserType) => {
        try {
            setLoadingUser(true);
            const dataValues = { username, password };
            const options: RequestInit = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(dataValues)
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                const dataInfo = await response.json();
                setErrorUser({ errorValue: true, message: `${dataInfo.message.info}` });
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorUser({ errorValue: true, message: error.message });
            };
        } finally {
            setLoadingUser(false);
        };
    };
    return { dataUser, errorUser, loadingUser, login, signin };
};
export default useApiUser;