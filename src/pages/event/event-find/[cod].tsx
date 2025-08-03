import ListDataEvent from "@/ui/lists/ListDataEvent";
import { useRouter } from "next/router";

export default function EventFind() {
    const route = useRouter();
    const codigoEvent = route.query.cod;
<<<<<<< HEAD
    const { addEvent, addStadium, addPlayers } = useContext(EventContext);

    useEffect(() => {
        if (codigoEvent == undefined) {
            return;
        } else {
            getEventByCodigo(codigoEvent.toString());
        }
    }, [url]);

    useEffect(() => {
        if (dataInfo.length !== 0) {
            console.log("Tiene valores");
            dataInfo.forEach((elem) => {
                addEvent({ date: elem.date, codigo: elem.codigo });
                elem.players.forEach((player) => {
                    addPlayers({name: player.name, surname: player.surname, phoneNumber: player.phoneNumber, email: player.email});
                })                
            })
        } else {
            console.log("No hay valores");
        }
    }, [dataInfo]);


    return (
        <>
            <h3>Event find page</h3>
            {loading ? <Alert variant="filled" severity="info">Cargando ...</Alert> : null}
            <ListDataEvent />
=======

    return (
        <>
            <h3>Información del Evento</h3>
            <ListDataEvent codigoParams={codigoEvent} />
>>>>>>> master
        </>
    );
};