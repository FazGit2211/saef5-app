import { createContext, ReactNode, useState } from "react";
interface ProductType {
    cant: number,
    id: number,
    name: string,
    price: number,
    description: string,
    stock: number,
    category: string,
    image: string,
    code: string,
    type: string
}

interface ContextCartProductType {
    productList: ProductType[],
    addProduct: (prod: ProductType) => void,
    removeProduct: (num: number) => void
};
interface ProviderType {
    children: ReactNode
};
const defaultValues: ContextCartProductType = {
    productList: [],
    addProduct: () => { },
    removeProduct: () => { }
};

const CartProductContext = createContext(defaultValues);
const CardProductProvider = ({ children }: ProviderType) => {
    const [productList, setProductList] = useState<ProductType[]>(defaultValues.productList);
    const addProduct = (prod: ProductType) => {
        let array = productList.slice();
        let act = array.pop();
        if (act?.name !== prod.name && prod.cant > 0) {
            setProductList([...productList, prod]);
        };
    };
    const removeProduct = (num: number) => {
        productList.splice(num, 1);
    };
    const data = { productList, addProduct, removeProduct };
    return <CartProductContext.Provider value={data}>{children}</CartProductContext.Provider>
}
export { CardProductProvider }
export default CartProductContext;