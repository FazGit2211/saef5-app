import { createContext, ReactNode, useState } from "react"

interface PlayerType {
    name: string,
    surname: string,
    phoneNumber: number,
    email: string
};

interface ContextType {
    players: PlayerType[],
    addPlayers: (player: PlayerType) => void,
};

interface ProviderType {
    children: ReactNode
};

const PlayerContext = createContext<ContextType | {}>({});

const PlayerProvider: React.FC<ProviderType> = ({ children }) => {
    const [players, setPlayers] = useState<PlayerType[]>([]);
    const addPlayers = (player: PlayerType) => {
        const values = [...players, player];
        setPlayers(values);
    };
    const data = { players, addPlayers };

    return <PlayerContext.Provider value={data}>{children}</PlayerContext.Provider>
}
export { PlayerProvider }
export default PlayerContext;