import CartProductContext from "@/context/CartProductContext";
import { Delete, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, Collapse, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const ListProduct = () => {
    const router = useRouter();
    const { productList, removeProduct } = useContext(CartProductContext);
    const [open, setOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    const handleDeletedItem = (num: number) => {
        removeProduct(num);
        setDeleted(!deleted);
    };
    const handleClickBuy = () => {
        if (productList.length > 0) {
            router.push("/product/product-buy");
        }
    };
    return (
        <>
            <List>
                <ListItemButton onClick={handleOpen} color="info">
                    <ListItemText primary="Productos" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {productList.length > 0 ? productList.map((elem, index) => (<ListItem key={elem.name}><Typography variant="h6">{elem.name}</Typography><Button variant="contained" onClick={() => handleDeletedItem(index)} sx={{ backgroundColor: "red", margin: 1 }}><Delete /></Button></ListItem>)) : <Typography variant="h6" color="secondary">No hay productos en el carrito</Typography>}
                        <Button variant="contained" onClick={handleClickBuy}>Ir a comprar</Button>
                    </List>
                </Collapse>
            </List>
        </>
    );
};
export default ListProduct;