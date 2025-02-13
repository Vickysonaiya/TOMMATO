import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileImage, setProfileImage] = useState(assets.profile_image); // Initial profile image

  // Toggle the dropdown visibility
  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  // Handle profile image change
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is a valid image
      if (file.type.startsWith('image/')) {
        // Create a temporary URL for the selected image file
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl); // Update state to reflect the new image
      } else {
        alert('Please select a valid image file');
      }
    }
  };

  return (
    <div className='navbar'>
      <Link to="/">
        <img className='logo' src={assets.logo} alt="Logo" />
      </Link>
      <div className="profile-dropdown">
        <img
          className='profile'
          src={profileImage}  // Dynamically update the profile image based on state
          alt="Profile"
          onClick={handleProfileClick}
        />
        <ul className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
          <li>
            <Link to="/list">Profile</Link>
          </li>
          <li>
            <Link to="/orders">My Orders</Link>
          </li>
          <li>
            <Link to={handleProfileImageChange} onClick={() => document.getElementById('profile-upload').click()}>Change Picture</Link>
          </li>
        </ul>

        {/* File input to change the profile picture */}
        <input
          type="file"
          accept="image/*"
          id="profile-upload"
          style={{ display: 'none' }} // Hide the file input
          onChange={handleProfileImageChange}
        />
      </div>
    </div>
  );
};

export default Navbar;
