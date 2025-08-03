import { createContext, ReactNode, useState } from "react"

export interface PlayerType {
    name: string,
    surname: string,
    phoneNumber: number,
    email: string,
    state: string
};

export interface StadiumType {
    name: string,
    address: string
};

export interface EventType {
    codigo: string,
    date: string,
};

interface ContextType {
    event: EventType,
    stadium: StadiumType,
    players: PlayerType[],
    addEvent: (even: EventType) => void,
    addStadium: (stadium: StadiumType) => void,
    addPlayers: (player: PlayerType[]) => void,
    removeEvent: () => void
};

interface ProviderType {
    children: ReactNode
};

const defaultValues: ContextType = {
    event: { codigo: "", date: "" },
    stadium: { name: "", address: "" },
    players: [],
    addEvent: () => { },
    addStadium: () => { },
    addPlayers: () => { },
    removeEvent: () => { }
}

const EventContext = createContext(defaultValues);
const EventProvider = ({ children }: ProviderType) => {
    const [event, setEvent] = useState<EventType>({ codigo: "", date: "" });
    const [stadium, setStadium] = useState<StadiumType>({ name: "", address: "" });
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
        setEvent({ codigo: "", date: "" });
        setStadium({ name: "", address: "" });
        setPlayers([]);
    }

    const data = { event, stadium, players, addEvent, addStadium, addPlayers, removeEvent };
    return <EventContext.Provider value={data}>{children}</EventContext.Provider>
}

export { EventProvider }
export default EventContext;