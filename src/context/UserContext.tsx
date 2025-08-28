import { createContext, ReactNode, useState } from "react";
import { EventType } from "./EventContext";
export interface UserType {
    id: number,
    username: string,
    password: string,
    Events: EventType[]
};
interface ContextUserType {
    user: UserType,
    addUser: (userData: UserType) => void,
    removeEventUser: (index: number) => void
};
interface ProviderUserType {
    children: ReactNode
};
const useContextUserDefault: ContextUserType = {
    user: { id: 0, username: "", password: "", Events: [] },
    addUser: () => { },
    removeEventUser: () => { }
};

const UserContext = createContext(useContextUserDefault);
const UserProvider = ({ children }: ProviderUserType) => {
    const [user, setUser] = useState<UserType>({ id: 0, username: "", password: "", Events: [] });
    const addUser = (userData: UserType) => { setUser(userData) };
    const removeEventUser = (index: number) => { user.Events.splice(index, 1) };
    const data = { user, addUser, removeEventUser };
    return <UserContext.Provider value={data}>{children}</UserContext.Provider>
};
export { UserProvider };
export default UserContext;
