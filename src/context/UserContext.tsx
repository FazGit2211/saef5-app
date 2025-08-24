import { createContext, ReactNode, useState } from "react";
export interface UserType {
    id: number,
    username: string,
    password: string,
};
interface ContextUserType {
    user: UserType,
    addUser: (userData: UserType) => void
};
interface ProviderUserType {
    children: ReactNode
};
const useContextUserDefault: ContextUserType = {
    user: { id: 0, username: "", password: "" },
    addUser: () => { }
};

const UserContext = createContext(useContextUserDefault);
const UserProvider = ({ children }: ProviderUserType) => {
    const [user, setUser] = useState<UserType>({ id: 0, username: "", password: "" });
    const addUser = (userData: UserType) => { setUser(userData) };

    const data = { user, addUser };
    return <UserContext.Provider value={data}>{children}</UserContext.Provider>
};
export { UserProvider };
export default UserContext;
