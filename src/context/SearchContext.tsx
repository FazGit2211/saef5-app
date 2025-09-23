import { createContext, ReactNode, useState } from "react"


interface SearchContextType {
    code: string,
    handleChangeCode: (codeEvent: string) => void
}
const defaultContextType: SearchContextType = {
    code: "",
    handleChangeCode: () => { }
}
interface ProviderType {
    children: ReactNode
};
const SearchContext = createContext(defaultContextType);
const SearchProvider = ({ children }: ProviderType) => {
    const [code, setCode] = useState("");
    const handleChangeCode = (c: string) => {
        setCode(c);
    };
    const data = { code, handleChangeCode };
    return <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
}
export { SearchProvider }
export default SearchContext;