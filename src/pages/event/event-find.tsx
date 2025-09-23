import BtnSearchEvent from "@/ui/btns/BtnSearchEvent";
import ListDataEvent from "@/ui/lists/ListDataEvent";
import TextFieldSearchEvent from "@/ui/textfield/TextFieldSearchEvent";

const EventFind = () => {
    console.log("Componente Event FInd");
    return (
        <>
            <TextFieldSearchEvent />
            <BtnSearchEvent />
            <ListDataEvent />
        </>
    );
};
export default EventFind;