import { Button, Card, CardActions } from "@mui/material"
import Image from "next/image";
import { useRouter } from "next/router";

const CardCategories = () => {
    const router = useRouter();
    const handleClickTshirt = () => {
        router.push("/product/product-list-tshirt");
    };
    const handleClickPants = () => {
        router.push("/product/product-list-pants");
    };
    return (
        <Card>
            <CardActions>
                <Button variant="contained" onClick={handleClickTshirt}><Image src="/tshirt.jpg" alt="Imagen camiseta" width={100} height={100} /></Button>
                <Button variant="contained" onClick={handleClickPants} color="secondary"><Image src="/pants.jpg" alt="Imagen pantalon" width={100} height={100} /></Button>
                <Button variant="contained" color="success"><Image src="/footwears.jpg" alt="Imagen calzado" width={100} height={100} /></Button>
            </CardActions>
        </Card>
    );
};
export default CardCategories;