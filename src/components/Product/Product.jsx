import { useContext, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import Loader from "../Loader/Loader";

import { ShopContext } from "../../services/context/shop-context";

function Product() {
    const { product, setProduct, addToCart } = useContext(ShopContext)

    const { id } = useParams() 

    useEffect(() => {
        console.log(Object.keys(product))

        if (!product || Object.keys(product).length === 0) {
                fetch(`https://fakestoreapi.com/products`)
                .then(res => res.json())
                .then(res => res.filter((elem) => elem.id == id))
                .then(res => setProduct(res[0]))
                .catch(err => console.log(err))
            } else {
                console.log("effect")
        }
    }, [])

    return ( 
        <>
        {product ? 
            <div className="product">
                <h1>{product.title}</h1>
                <img src={product.image} className="w-40 h-40" />
                <h2>{product.price}</h2>
                <button onClick={() => addToCart(product)}>Ajouter</button>
                <Link to="/shop">Shop</Link>
            </div> 
        : < Loader />}
        </>
    )
}

export default Product;