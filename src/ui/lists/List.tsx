import { ListItem } from "@mui/material";
import ListPlayer from "@mui/material/List";
import { useState } from "react";
export default function List() {
    const [data, setData] = useState([]);
    return (
        <>
            <ListPlayer>
                {data.map((elem) => {
                    return <ListItem>{elem}</ListItem>
                })}
            </ListPlayer>
        </>
    )
}