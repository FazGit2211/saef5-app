import EventContext from "@/context/EventContext";
import BtnSearchEvent from "@/ui/btns/BtnSearchEvent";
import ListDataEvent from "@/ui/lists/ListDataEvent";
import TextFieldSearchEvent from "@/ui/textfield/TextFieldSearchEvent";
import { useContext } from "react";

const EventFind = () => {
    const { event } = useContext(EventContext);
    return (
        <>
            <TextFieldSearchEvent />
            <BtnSearchEvent />
            {event.id > 0 ? <ListDataEvent /> : null}
        </>
    );
};
export default EventFind;