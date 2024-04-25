import { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../../services/context/shop-context'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'

import axios from 'axios'

import SearchBar from '../../components/SearchBar/SearchBar'

function Shop() {
    const [cartOpen, setCartOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // On importe les différents éléments qui vont nous etre utiles dans ce composant 
    // à l'aide du hook useContexte en précisant en paramètre le contexte en question (ici ShopContext)
    const { products,
        setProducts,
        cartItems,
        addToCart,
        getItemsSum,
        removeFromCart,
        showProduct
        } = useContext(ShopContext)

    // Ici on utilise useNavigate qui va nous permettre d'accéder à d'autres composants 
    // Dans notre cas c'est pour le bouton checkout du cart (qui renvoit vers la page de checkout)
    const navigate = useNavigate();

    // Je viens faire l'appel API afin de récupérer les produits
    useEffect(() => {
        // On crée un nouvel objet abort controller 
        const abortController = new AbortController()

        // On effectue notre requete vers l'API
        axios.get(`https://fakestoreapi.com/products`, {
            signal: abortController.signal
        })
        .then((res) => {
            console.log(res)
            setProducts([])
            res.data.map(item => {
                setProducts(prevItems => [...prevItems, item])
            })
            // console.log("connect")
            setIsLoading(false)
        })
        .catch((err) => console.log(err))


        // On vient cleanup en stoppant la connexion avec abort controller
        return () => {
            abortController.abort()
        }
    }, [])

    return (
        <div className="shop">
            <h1 className='mx-auto mt-12 mb-8'>Mon shop</h1>

            {/* Ici nous avons notre cart avec les conditions  */}
            <div className="cart z-50">
                <div onClick={() => setCartOpen(prev => !prev)} className="cart-logo fixed top-8 right-12 z-50 cursor-pointer">
                    {(getItemsSum() > 0) &&
                        <div className="t-0 absolute left-3">
                            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{getItemsSum()}</p>
                        </div>}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-4 h-10 w-10 rounded-full bg-white p-2 border border-slate-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </div>
                {(getItemsSum() > 0 && cartOpen) &&
                    <div className='cart-window border-slate-500 border bg-white rounded-lg p-6 fixed w-72 top-24 right-12 z-50'>
                        <ul className='bg-blue-10'>
                            {cartItems.map(item => (
                                <li className="relative text-left p-2 my-1" key={item.id}>
                                    <p className='mr-12'>{item.quantity} x {item.title}, <b>{item.price * item.quantity} €</b></p>
                                    <button className='bg-blue-800 text-white absolute top-0 right-0 px-2 py-px text-lg' onClick={() => removeFromCart(item)}>x</button>
                                </li>
                            ))}
                        </ul>
                        <button className='border border-slate-500 mt-4' onClick={() => navigate('/checkout')}>Checkout</button>
                        <button className='border border-slate-500 mt-2 ml-2' onClick={() => setCartOpen(prev => !prev)}>Close Cart</button>
                    </div>
                }
            </div>

            <SearchBar />

            {/* Ici notre liste de produits recuperés depuis l'API */}
            <ul className="products grid grid-cols-4 z-0">
                {!isLoading ? 
                    products.map(item => (
                    <li onClick={() => showProduct(item)} className="py-10 px-6 relative cursor-pointer" key={item.id}>
                        <h3 className='font-bold'>{item.title}</h3>
                        <img className='my-8 mx-auto w-44 h-52' src={item.image}></img>
                        <p>{item.price} €</p>
                        <p className='my-6'>{item.description.slice(0, 130)} ...</p>
                        <button onClick={() => addToCart(item)} className='absolute bottom-0 inset-x-9'>Ajouter au panier</button>
                    </li>
                    ))
                : < Loader />}
            </ul>
        </div>
    );
}

export default Shop;