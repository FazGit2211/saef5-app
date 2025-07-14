import { createContext, ReactNode, useState } from "react"

interface PlayerType {
    name: string,
    surname: string,
    phoneNumber: number,
    email: string
};

interface ContextType {
    players: PlayerType[],
    playersEdited: PlayerType[],
    addPlayers: (player: PlayerType) => void,
    addPlayersEdited: (player: PlayerType) => void,
    removePlayers: (indexPlayer: number) => void,
    removeAll: () => void;
};

interface ProviderType {
    children: ReactNode
};
const useContextDefault: ContextType = {
    players: [], playersEdited: [], addPlayers: () => { }, addPlayersEdited: () => { }, removePlayers: () => { }, removeAll: () => { }
}
const PlayerContext = createContext(useContextDefault);

const PlayerProvider: React.FC<ProviderType> = ({ children }) => {
    const [players, setPlayers] = useState<PlayerType[]>([]);
    const [playersEdited, setPlayersEdited] = useState<PlayerType[]>([]);

    const addPlayers = (player: PlayerType) => {
        const values = [...players, player];
        setPlayers(values);
    };

    const addPlayersEdited = (player: PlayerType) => {
        const values = [...playersEdited, player];
        setPlayersEdited(values);
    }

    const removePlayers = (indexPlayer: number) => {
        players.splice(indexPlayer, 1);
        console.log(players);
    };

    const removeAll = () => {
        setPlayers(useContextDefault.players);
    }

    const data = { players, playersEdited, addPlayers, addPlayersEdited, removePlayers, removeAll };

    return <PlayerContext.Provider value={data}>{children}</PlayerContext.Provider>
}
export { PlayerProvider }
export default PlayerContext;