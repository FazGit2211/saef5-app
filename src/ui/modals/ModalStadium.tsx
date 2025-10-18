import { StadiumType } from "@/context/EventContext";
import { Close, Save } from "@mui/icons-material";
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { style } from "./ModalCreatePlayer";
import useApiStadium from "@/hooks/useApiStadium";
export interface PropsType {
    openModal: boolean,
    closeModal: () => void,
    stadium: StadiumType,
    addStadium: (s: StadiumType) => void
};
const ModalStadium = ({ openModal, closeModal }: PropsType) => {
    const [sendForm, setSendForm] = useState(false);
    const [name, setName] = useState("");
    const urlStadium = "http://localhost:5041/Stadium";
    const { getAllStadiums, dataStadium, loadingStadium } = useApiStadium(urlStadium);

    const handleChangeName = (event: SelectChangeEvent) => {
        const { target: { value } } = event;
        setName(value);
    };
    const handleSaveBtn = () => {
    };

    useEffect(() => {
        getAllStadiums();
    }, [urlStadium]);
    return (
        <>
            <Modal open={openModal}>
                <Box sx={style}>
                    <Typography variant="h5">Seleccionar la cancha:</Typography>
                    <FormControl>
                        <InputLabel id="select-stadiums">Canchas</InputLabel>
                        <Select labelId="select-stadiums" multiple value={name} onChange={handleChangeName}>
                            {dataStadium.map((elem) => (<MenuItem key={elem.id} defaultValue={name}>{elem.name}</MenuItem>))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={handleSaveBtn} color="success"><Save /></Button>
                    <Button variant="contained" onClick={closeModal} color="warning"><Close /></Button>
                    {sendForm ? <Alert variant="filled" severity="success" color="info">Agregado Correctamente</Alert> : null}
                </Box>
            </Modal>
        </>
    )
}
export default ModalStadium;