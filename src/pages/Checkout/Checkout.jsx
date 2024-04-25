import { useContext } from 'react'
import { ShopContext } from '../../services/context/shop-context';

function Checkout() {
    // On importe ces éléments depuis le contexte de notre shop
    const { cartItems, removeFromCart } = useContext(ShopContext)

    const getSumPrice = () => {
        let sum = 0;
        cartItems.forEach(item => {
            sum += (item.price * item.quantity)
        });
        return sum;
    }

    // Alternative avec reducer en JS pour calculer la somme des différents prix
    // const getSumPrice2 = () => {
    //     return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // };

    return ( 
        <div className="checkout">
            <h1>Checkout</h1>
            <ul className='my-12'>
                {cartItems.map(item => (
                    <li className='flex start py-2 items-center relative' key={item.id}>
                        <img className='w-12 h-12 mr-12' src={item.image} />
                        <p className='text-left mr-16'><b>{item.quantity}</b> x {item.title} : {item.price * item.quantity} €</p>
                        <button className='absolute right-0' onClick={() => removeFromCart(item)}>x</button>
                    </li>
                ))}
            </ul>
            <div className="sum">
                <p>TOTAL : <b>{ 
                    getSumPrice()       
                } €</b></p>
            </div>
            <button className='mt-4'>Proceed to payment</button>
        </div>
     );
}

export default Checkout;