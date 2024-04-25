import { useState, useRef, useEffect } from 'react'
import { Outlet, Link } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu'

import './Layout.css'

import menu from '../../data/menu'

function Layout() {
    const [active, setActive] = useState(false)

    const ref = useRef()

    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActive(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
  
      // Cleanup function qui vient supprimer l'écouteur quand le composant unmount
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [])

    console.log(ref)

    return (
      <>
        <nav className='z-50 relative'>
          <MenuIcon
            fontSize="large"
            sx={{
              position: "fixed",
              left: "2rem",
              top: "2.6rem",
              cursor: "pointer",
            }}
            onClick={() => setActive((prev) => !prev)}
          />
          {active && (
            <ul ref={ref} className='menu-layout'>
                {menu.map((item) => (
                    <Link key={item.id} to={item.path}>{item.name}</Link>
                ))}
            </ul>
          )}
        </nav>

        <Outlet />
      </>
    );
}

export default Layout