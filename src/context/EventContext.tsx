import { createContext, ReactNode, useState } from "react"

interface PlayerType {
    name: string,
    surname: string,
    phoneNumber: number,
    email: string
};

interface StadiumType {
    name: string,
    address: string
};

interface EventType {
    codigo: string,
    date: string,
};

interface ContextType {
    event: EventType,
    stadium: StadiumType,
    players: PlayerType[],
    addEvent: (even: EventType) => void,
    addStadium: (stadium: StadiumType) => void,
    addPlayers: (player: PlayerType) => void,
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
    addPlayers: () => { }
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

    const addPlayers = (playerData: PlayerType) => {
        const values = [...players, playerData];
        setPlayers(values);
    };

    const data = { event, stadium, players, addEvent, addStadium, addPlayers };
    return <EventContext.Provider value={data}>{children}</EventContext.Provider>
}

export { EventProvider }
export default EventContext;