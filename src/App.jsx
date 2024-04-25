// MODULES
import { BrowserRouter, Routes, Route } from "react-router-dom"

import  React, { Suspense } from "react"

const Planes = React.lazy(() => import('./components/Planes/Planes'))

// COMPONENTS
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import NoPage from './pages/NoPage/NoPage'
import Form from './components/Form/Form'
import Quiz from './components/Quiz/Quizcorr'
import Todo from './components/Todo/TodoCorr3'
import Quote from './pages/Quote/Quote'
import Weather from './components/Weather/Weather'
import Movies from './pages/Movies/Movies'
import Login from './components/Login/Login'
import Counter from './components/Counter/Counter'
import Input from './components/Input/Input'
import Effect from './components/Effect/Effect'
import RSS from './components/RSS/RSS'
import Language from './components/Language/Language'
import Shop from './pages/Shop/Shop'
import Checkout from './pages/Checkout/Checkout'
// import Planes from "../Planes/Planes"
import Plane from "./components/Plane/Plane"
import Loader from "./components/Loader/Loader"
import Marvel from "./components/Marvel/Marvel"
import Product from "./components/Product/Product"
import Signup from "./components/Signup/Signup"

// CONTEXT
import { ShopContextProvider } from "./services/context/shop-context";
import { PlaneContextProvider } from "./services/context/PlaneContext";


// CSS
import './App.css'


function App() {
  return (
      <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='counter' element={<Counter />} />
                <Route path='input' element={<Input />} />
                <Route path="signup" element={<Signup />} />
                <Route path="effect" element={<Effect />} />
                <Route path="login" element={<Login />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="todo" element={<Todo />} />
                <Route path="quote" element={<Quote />} />
                <Route path="rss" element={<RSS />} />
                <Route path="form" element={<Form />} />
                <Route path="weather" element={<Weather />} />
                <Route path="marvel" element={<Marvel />} />
                <Route 
                  path="plane/:id" 
                  element={< PlaneContextProvider><Plane /></PlaneContextProvider>} />
                <Route 
                  path="planes"
                  element={< PlaneContextProvider><Suspense fallback={<Loader />}><Planes /></ Suspense></PlaneContextProvider>} />
                <Route path="shop" element={<ShopContextProvider><Shop /></ShopContextProvider>}  />
                <Route path="product/:id" element={<ShopContextProvider><Product /></ShopContextProvider>}  />
                <Route path="checkout" element={<ShopContextProvider><Checkout/></ShopContextProvider>} />
                <Route path="movies" element={<Movies/>} />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
      </div>
  )
}

export default App