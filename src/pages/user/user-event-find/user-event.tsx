import UserContext from "@/context/UserContext";
import TableEventUser from "@/ui/tables/TableEventUser";
import { Typography } from "@mui/material";
import { useContext } from "react";

export default function UserEvent() {
    const { user } = useContext(UserContext);
    return (
        <>
            <Typography variant="h5">Hola usuario {user.username}, hemos encontrado éstos eventos:</Typography>
            <TableEventUser />
        </>
    );
};