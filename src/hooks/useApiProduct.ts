import { useState } from "react"
export interface ProductType {
    id: number,
    name: string,
    price: number,
    description: string,
    stock: number,
    category: string,
    image: string,
    code: string,
    type: string
};

const useApiProduct = (url: string) => {
    const [product, setProduct] = useState<ProductType[]>([]);
    const [loadingProduct, setLoadingProduct] = useState(false);

    const getAllProduct = async () => {
        try {
            setLoadingProduct(true);
            const response = await fetch(url);
            const data = await response.json();
            setProduct(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setProduct([]);
            }
        } finally {
            setLoadingProduct(false);
        }
    };
    return { product, loadingProduct, getAllProduct }
};
export default useApiProduct;