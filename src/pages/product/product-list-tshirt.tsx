import useAlert from "@/hooks/useAlert";
import useApiProduct from "@/hooks/useApiProduct";
import CardProduct from "@/ui/cards/CardProduct";
import ListProduct from "@/ui/lists/ListProduct";
import { Typography } from "@mui/material";
import { useEffect } from "react";

const ProductListTshirt = () => {
    const urlProduct = "http://localhost:8080/tshirt";
    const { product, loadingProduct, getAllProduct } = useApiProduct(urlProduct);
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    useEffect(() => {
        handleShowAlert();
        getAllProduct();
        handleSetTimeOut();
    }, []);
    return (
        <>
            {alert || loadingProduct ? <Typography variant="h6">Cargando ...</Typography> : product.map(elem => <CardProduct key={elem.id} id={elem.id} name={elem.name} price={elem.price} description={elem.description} stock={elem.stock} category={elem.category} image={elem.image} code={elem.code} type={elem.type} />)}
            <ListProduct /></>
    );
};
export default ProductListTshirt;