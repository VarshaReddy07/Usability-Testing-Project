import axios from "axios";

export async function productsData(){
    const products = await axios.get(
        "https://api.npoint.io/a4d189ba4b7c21ceb594"
    );
    return products;
}