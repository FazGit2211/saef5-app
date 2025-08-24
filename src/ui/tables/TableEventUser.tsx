import { Paper, Table, TableBody, TableCell, TableContainer, TableHead } from "@mui/material";
export default function TableEventUser() {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableCell>Codigo del evento</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Nombre cancha</TableCell>
                    <TableCell>Dirección cancha</TableCell>
                </TableHead>
                <TableBody>
                    {}
                </TableBody>
            </Table>
        </TableContainer>
    );
};