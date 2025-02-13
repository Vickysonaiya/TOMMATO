import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Menu");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [profileImage, setProfileImage] = useState(assets.profile_icon);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    window.scrollTo(0, 0);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
      } else {
        alert('Please select a valid image file');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleHomeClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className='navbar'>
      <Link to='/' onClick={handleLogoClick}>
        <img src={assets.logo} alt='' className='logo' />
      </Link>
      
      <ul className="navbar-menu">
        <Link to='/' onClick={handleHomeClick} className={menu === "Home" ? "active" : ""}>Home</Link>
        {/* <a href='#home' onClick={(handleHomeClick) => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</a> */}
        <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
        <a href='#app-downlaod' onClick={() => setMenu("Mobile-app")} className={menu === "Mobile-app" ? "active" : ""}>Mobile-App</a>
        <a href='#footer' onClick={() => setMenu("Contact us")} className={menu === "Contact us" ? "active" : ""}>Contact us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt='' className='search-icon' />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ?
          <button onClick={() => setShowLogin(true)}>Sign in</button>
          :
          <div className='navbar-profile'>
            <div className="profile-pic-wrapper">
              <img src={profileImage} alt="Profile" className="profile" />
              <input
                type="file"
                accept="image/*"
                id="profile-upload"
                style={{ display: 'none' }}
                onChange={handleProfileImageChange}
              />
            </div>
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" /><p>Orders</p>
              </li>
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" /><p>Logout</p>
              </li>
              <li onClick={() => document.getElementById('profile-upload').click()}>
                <img src={assets.profile_icon} alt="" /><p>Change Picture</p>
              </li>
            </ul>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
