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

interface PropsType {
    event: EventType,
    stadium: StadiumType,
    players: PlayerType[]
};

export default function ListDataEvent({ event, stadium, players }: PropsType) {
    return (
        <>

        </>
    )
}