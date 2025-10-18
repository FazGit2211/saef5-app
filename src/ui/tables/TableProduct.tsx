import CartProductContext from "@/context/CartProductContext";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext } from "react";

const TableProduct = () => {
    const { productList } = useContext(CartProductContext);
    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Producto</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Cantidad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productList.map((elem) => (<TableRow key={elem.id}><TableCell>{elem.name}</TableCell><TableCell>{elem.price}</TableCell><TableCell>{elem.cant}</TableCell></TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
export default TableProduct;