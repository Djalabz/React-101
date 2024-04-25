import { useContext } from 'react'
import { ShopContext } from '../../context/shop-context'

function ShopTags() {
    const { tag, setTag, products } = useContext(ShopContext) 

    // const tags = [
    //     "Vetements",
    //     "Bijoux", 
    //     "Disques durs",
    //     "Sacs",
    //     "Televisions"
    // ]
    const categories = ["women's clothing", "men's clothing", "jewelery", "electronics"]

    return ( 
        <div className="mt-4">
            {products.length > 0 && categories.map((item, index) => ((tag === item) ? 
            <button key={index} onClick={() => setTag("")} className="mr-2 p-2 bg-blue-800 text-white">{item}</button> : 
            <button key={index} onClick={() => setTag(item)} className="mr-2 p-2">{item}</button>))}
        </div>
     )
}

export default ShopTags;