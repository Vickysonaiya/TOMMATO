import React from 'react'
import './Header.css'
import { menu_list } from '../../assets/assets'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order Your Favourite Food Here</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our meales satisfy your craving and elevate your dining experience, one delicious meal at a time.</p>
            <button className='menu-button'><a href='#explore-menu' onClick={()=>setMenu("Menu")} >View Menu</a></button>
        </div>
      
    </div>
  )
}

export default Header
