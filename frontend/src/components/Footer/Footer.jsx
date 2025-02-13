import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Footer = () => {

    const handleLogoClick = () => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      };

    const socialMediaLinks = [  
        {  
         icon: assets.facebook_icon,  
         url: 'https://www.facebook.com/your-page-url',  
         alt: 'Facebook',  
        },  
        {  
         icon: assets.twitter_icon,  
         url: 'https://twitter.com/your-handle',  
         alt: 'Twitter',  
        },  
        {  
         icon: assets.linkedin_icon,  
         url: 'https://www.linkedin.com/company/your-company-name',  
         alt: 'LinkedIn',  
        },  
      ]; 
    return (
        <div className='footer' id='footer'>
            <div className="footer-conent">
                <div className="footer-content-left">
                    <Link to='/' onClick={handleLogoClick}><img src={assets.logo} alt='' className='logo'></img></Link>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <div className="footer-social-icon">  
                        {socialMediaLinks.map((link, index) => (  
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">  
                            <img src={link.icon} alt={link.alt} />  
                        </a>  
                        ))}  
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <a href='/'><li>Home</li></a>
                        <a href='/contact-us'><li>About US</li></a>
                        <a href='/myorders'><li>Delivery</li></a>
                        <a href='/contact-us'><li>Privacy Policy</li></a>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>  
                        <li><a href="tel:+919106471172" target='_blank'>+91-910-647-1172</a></li>  
                        <li><a href="https://wa.me/9106471172" target='_blank'>+91-910-647-1172 (WhatsApp)</a></li>  
                        <li><a href="mailto:contact@tomato.com" target='_blank'>contact@tomato.com</a></li>  
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2024 &#169; tomato.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer
