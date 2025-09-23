import SearchContext from "@/context/SearchContext";
import { TextField } from "@mui/material"
import React, { ChangeEvent, useContext } from "react";

const TextFieldSearchEvent = () => {
    const { code, handleChangeCode } = useContext(SearchContext);
    console.log("Component TextField");
    return (
        <TextField label="Nombre,codigo o alias evento" variant="filled" value={code} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeCode(e.target.value)}></TextField>
    )
}
export default TextFieldSearchEvent;