import logo from "../assets/images/logo/logo.png"
import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
// import  {getModularInstance}  from "../utilis";

const Navitems = () => {
    const [menuToggle, setMenuToggle] = useState(false);
    const [socialToggle, setSocialToggle] = useState(false);
    const [headerFixed, setHeaderFixed] = useState(false);
    const log_hid = {display:'flex'};
    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();
 

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        setHeaderFixed(true);
        
    }else{
        setHeaderFixed(false);
        
    }
})

const handleSignOut = async () =>{
    try{
        await logOut()
        navigate("/")
    }catch (error){

    }
}

const {user} = useContext(AuthContext);
console.log(user)

// console.log(user.displayName)

const bgHiddenBtn = user ? "HiddenBtn" : ""

const bgHiddenBtn2 = user ? {} : "HiddenBtn"


    return (
    <header className={`header-section style-4 ${headerFixed ? "header-fix fadeInUp" : ""}`}>
        <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
            <div className='container'>
                <div className='header-top-area'>
                    
      {user ? (
        
        <button   onClick={handleSignOut}>Sign Out</button>
       ) : (
        
        <span><Link to="/signup" className={`lab-btn me-3 `}><span>Create Account {socialToggle}</span></Link>
        <Link to="/login"  className={` lab-btn me-3 `}><span>  Login</span></Link></span>
       )}
                </div>

            </div>
        </div>

        <div className='header-bottom'>
            <div className='container'>
                <div className='header-wrapper'>

                    <div className='logo-search-acte'>
                        <div className='logo'>
                            <Link to={"/"}>
                                <img src={logo} alt="" />
                            </Link>

                        </div>

                        </div>
                        <div className='menu-area'>
                            <div className='menu nav'>
                                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/shop">Shop</Link></li>
                                    <li><Link to="/blog">Blog</Link></li>
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>
                                    {user ? (

                                    <li><Link>Profile</Link>
                                    <ul className="sub-nav">
                                        <li><a>{user.displayName}</a></li>
                                        <li><a   onClick={handleSignOut}>Sign Out</a></li>
                                        
                                    </ul>
                                    </li>

                                    ) : (

                                    <li style={log_hid}><Link to="/sign-up"  className={`lab-btn me-3 d-none d-md-block${bgHiddenBtn} `}> Create Account</Link>
                                    <Link to="/login"  className={`lab-btn me-3 d-none d-md-block ${bgHiddenBtn} `}> Log In</Link></li>
                                    
                                    )}
                                    
                                </ul>
                            </div>

                       
                         <div onClick={() => setMenuToggle(!menuToggle)} className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}>
                                <span></span>
                                <span></span>
                                <span></span>

                            </div>

                            <div className="ellepsis-bar d-md-none" onClick={() => setSocialToggle(!socialToggle)}>
                                <i className="icofont-info-square"></i>

                            </div>
                        </div>


                </div>

            </div>
            
        </div>
    </header>
  )
}

export default Navitems