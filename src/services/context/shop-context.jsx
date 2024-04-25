import { createContext, useState } from 'react'
import { useNavigate } from 'react-router'

// On crée notre contexte dans un premier temps,
// Entre () les valeurs initiales, ici nous n'en préciserons pas
export const ShopContext = createContext()

// Notre fonction de context provider - ou fournisseur du contexte -
// Je vais devoir englober les composants avec lesquels je veux partager le contexte avec cette fonction (dans app.jsx)
// C'est dans cette fonction que nous allons rassembler les variables et fonctions qui correspondent au contexte du shop
export const ShopContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})
    const [search, setSearch] = useState("")
    const [tag, setTag] = useState("")

    const navigate = useNavigate()

    // CART LOGIC

    // On ajoute un element au panier, si il n'y en a pas on rajoute une propriété quantity : 1
    // Si il y a déja des éléments avec le meme id on ajoute +1 à la propriété quantity 
    const addToCart = (item) => {
        const itemInCart = cartItems.find(elem => elem.id === item.id)
    
        if (itemInCart) {
            setCartItems(cartItems => cartItems.map(elem => elem.id === item.id ? { ...elem, quantity: elem.quantity + 1 } : elem))
        } else {
            setCartItems(cartItems => [...cartItems, { ...item, quantity: 1 }])
        }
    }

    // Ici on retire 1 à quantity à moins qu'il n'y ait qu'un seul produit du type dans le panier 
    // auquel cas on retire le produit en filtrant avec .filter 
    const removeFromCart = (item) => {
        const updatedCart = cartItems.map(elem =>
            elem.id === item.id ? { ...elem, quantity: elem.quantity - 1 } : elem
        ).filter(elem => elem.quantity > 0);
    
        setCartItems(updatedCart);
    }

    // Somme des items dans mon panier
    const getItemsSum = () => {
        let sum = 0;
        cartItems.forEach(item => sum += item.quantity)

        return sum
    }

    // SEARCHBAR LOGIC
    const handleSearch = (value) => {
        const newProducts = products.filter(prod => 
            prod.title.toLowerCase().includes(search.toLowerCase()))

        setProducts(newProducts)
    }

    // PRODUCT LOGIC
    const showProduct = (item) => {
        setProduct(item)
        navigate(`/product/${item.id}`)
    }

    // GROUP VALUES TO SHARE - Je regroupe sous une meme const les différents éléments 
    // à partager
    const contextValues =
        { products, setProducts, 
          product, setProduct, showProduct,  
          handleSearch, search, setSearch, 
          cartItems, setCartItems, 
          addToCart, removeFromCart,
          tag, setTag, 
          getItemsSum }

    // Finalement on vient retourner le provider. Ici children représente les composants enfants
    return <ShopContext.Provider value={contextValues}>{children}</ShopContext.Provider>
}