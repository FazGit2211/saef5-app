import CartProductContext from "@/context/CartProductContext";
import { ProductType } from "@/hooks/useApiProduct";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { Button, Card, CardActions, Typography } from "@mui/material";
import { useContext, useState } from "react";

const CardProduct = ({ name, price, description, stock, category, image, code, type }: ProductType) => {
    //Utilizar el contexto para agregar al carrito
    const { addProduct } = useContext(CartProductContext);
    const [count, setCount] = useState(0);
    const handleIncrement = () => {
        setCount(count + 1);
    };
    const handleDecrement = () => {
        setCount(count - 1);
    };
    return (
        <Card>
            <Typography variant="h6">
                {`Camiseta ${name} - $${price} - Stock ${stock}`}
            </Typography>
            <CardActions>
                <Button onClick={handleIncrement}><Add /></Button>
                <Button onClick={handleDecrement}><Remove /></Button>
                <Typography variant="h6">{count}</Typography>
                <Button onClick={() => addProduct({ cant: count, id: 0, name, price, description, stock, category, image, code, type })}><ShoppingCart />Agregar al carrito</Button>
            </CardActions>
        </Card>
    );
}
export default CardProduct;