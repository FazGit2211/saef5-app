import { createContext, ReactNode, useState } from "react"
import { PlayerType } from "./PlayersContext";

export interface StadiumType {
    id: number,
    name: string,
    address: string
};

export interface EventType {
    id: number,
    code: string,
    date: string,
    Stadium: StadiumType,
    Player: PlayerType[]
};

interface ContextEventType {
    event: EventType,
    addEvent: (even: EventType) => void,
    addStadium: (stadium: StadiumType) => void,
    addPlayers: (player: PlayerType[]) => void,
    removeEvent: () => void,
};

interface ProviderType {
    children: ReactNode
};

const defaultValues: ContextEventType = {
    event: { id: 0, code: "", date: "", Stadium: { id: 0, name: "", address: "" }, Player: [] },
    addEvent: () => { },
    addStadium: () => { },
    addPlayers: () => { },
    removeEvent: () => { },
}

const EventContext = createContext(defaultValues);
const EventProvider = ({ children }: ProviderType) => {
    const [event, setEvent] = useState<EventType>({ id: 0, code: "", date: "", Stadium: { id: 0, name: "", address: "" }, Player: [] });
    const [stadium, setStadium] = useState<StadiumType>({ id: 0, name: "", address: "" });
    const [players, setPlayers] = useState<PlayerType[]>([]);

    const addEvent = (eventData: EventType) => {
        setEvent(eventData);
    };

    const addStadium = (stadiumData: StadiumType) => {
        setStadium(stadiumData);
    };

    const addPlayers = (playerData: PlayerType[]) => {
        setPlayers(playerData);
    };

    const removeEvent = () => {
        setEvent({ id: 0, code: "", date: "", Stadium: { id: 0, name: "", address: "" }, Player: [] });
        setStadium({ id: 0, name: "", address: "" });
        setPlayers([]);
    };

    const data = { event, stadium, players, addEvent, addStadium, addPlayers, removeEvent };
    return <EventContext.Provider value={data}>{children}</EventContext.Provider>
}

export { EventProvider }
export default EventContext;