import { createContext, PropsWithChildren, useState } from "react";

interface PlayerType {
    name: string,
    surname: string,
    phoneNumber: number,
    email: string
};


const PlayersContext = createContext({});

const PlayersProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [playerAdd, setPlayerAdd] = useState<PlayerType>();
    const handleAddPlayer = (player: PlayerType) => {
        setPlayerAdd(player);
    };
    
    const data = {playerAdd, handleAddPlayer}
    return <PlayersContext.Provider value={data}>{children}</PlayersContext.Provider>
}

export { PlayersProvider }
export default PlayersContext