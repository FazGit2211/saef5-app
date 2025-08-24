import { createContext, ReactNode, useState } from "react"
export interface PlayerType {
    id: number;
    name: string,
    email: string,
    state: string,
    admin: boolean
};
interface ContextPlayerType {
    players: PlayerType[],
    playersEdited: PlayerType[],
    addPlayer: (player: PlayerType) => void,
    addPlayerEdited: (player: PlayerType) => void,
    removePlayers: (indexPlayer: number) => void,
    removeAll: () => void;
};

interface ProviderPlayerType {
    children: ReactNode
};
const useContextDefault: ContextPlayerType = {
    players: [], playersEdited: [], addPlayer: () => { }, addPlayerEdited: () => { }, removePlayers: () => { }, removeAll: () => { }
}
const PlayerContext = createContext(useContextDefault);

const PlayerProvider: React.FC<ProviderPlayerType> = ({ children }) => {
    const [players, setPlayers] = useState<PlayerType[]>([]);
    const [playersEdited, setPlayersEdited] = useState<PlayerType[]>([]);

    const addPlayer = (p: PlayerType) => {
        const values = [...players, p];
        setPlayers(values);
    };

    const addPlayerEdited = (p: PlayerType) => {
        const values = [...playersEdited, p];
        setPlayersEdited(values);
    };

    const removePlayers = (indexPlayer: number) => {
        players.splice(indexPlayer, 1);
    };

    const removeAll = () => {
        setPlayers(useContextDefault.players);
    }

    const data = { players, playersEdited, addPlayer, addPlayerEdited, removePlayers, removeAll };

    return <PlayerContext.Provider value={data}>{children}</PlayerContext.Provider>
}
export { PlayerProvider }
export default PlayerContext;