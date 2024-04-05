import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { SIGNUP_API_URL} from '../Constants/URL';
const title = "Register Now";
const socialTitle = "Login with social Media"
const btnText = "Get Started Now"
const bgHidden = {background: 'none',};


const Signup = () => {
    const [errorMessage, seterrorMessage] = useState("");
    const{signUpWithGmail, createUser} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
  
    const from = location.state?.from?.pathname || "/";
  
  const handleRegister = () => {
    signUpWithGmail().then((result) => {
      const dataToSend = {
        displayName: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
        password: '',
      };
   
      const response = fetch(SIGNUP_API_URL, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dataToSend }),
      })
      console.log(response)

      navigate(from, {replace: true})
    }).catch((error) => {
      const errorMsg = error.message;
      seterrorMessage("Please Provide Valid Email & Password!")
    })
  }
const handleSignup = (event) => {
    event.preventDefault();
    const form = event.target;
    const displayName = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmpassword = form.confirmpassword.value;

    if (password !== confirmpassword) {
        seterrorMessage("Password Doesn't Match")
    }else{
        seterrorMessage("");
        // DATABASE STORE
       
        createUser(email, password).then((userCredential) =>{
            const uid = userCredential.user.uid;
            const dataToSend = {
              displayName: displayName,
              email: email,
              uid: uid,
              password: password,
            };
    
            const response = fetch(SIGNUP_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dataToSend }),
      })
      console.log(response)

            alert("Account Created Successfully Done!!!")
            navigate(from, {replace: true})
        }).catch((error) => {
          console.log(error.message);
          alert(`${error.message}`)
        })
    }
    // console.log(name, email, password, confirmpassword)
}
const user = useContext(AuthContext);

if (user == null) {
  return(
    <Navigate to="/" state={{from: location}} replace></Navigate>
    )
  
}
  return (
    <div>
    <div className='login-section padding-tb section-bg'>
      <div className="container">
        <div className="account-wrapper">
          <h3 className="title">{title}</h3>
          <form  className="account-form" onSubmit={handleSignup}>
            <div className="form-group">
              <input type="text" name='name' id='name' placeholder='Full Name' required />
            </div>
            <div className="form-group">
              <input type="email" name='email' id='email' placeholder='Email Id' required />
            </div>
            <div className="form-group">
              <input type="password" name='password' id='password' placeholder='Password' required />
            </div>
            <div className="form-group">
              <input type="password" name='confirmpassword' id='confirmpassword' placeholder='Confirm Password' required />
            </div>

            <div>
              {
                errorMessage && (
                  <div className='error-message text-danger'>
                    {errorMessage}
                  </div>
                )
              }
            </div>

            <div className='form-group'>
              <button type='submit' className='d-block lab-btn'>
                <span>{btnText}</span>
              </button>
            </div>
          </form>

          <div className='account-bttton'>
            <span className='d-blobk cate pt-10'>
              Have an Account? <Link to="/login">Login </Link>
            </span>
            <span className='or'>
              <span>or</span>
            </span>

            <h5 className='subtitle'>{socialTitle}</h5>
            <ul className='lab-ul social-icons justify-content-center'>
              <li>
                <button  style={bgHidden} onClick={handleRegister}><a className='github'><i className='icofont-github'></i></a></button>
              </li>
              <li>
                <button  style={bgHidden}><a className='facebook'><i className='icofont-facebook'></i></a></button>
              </li>
              <li>
                <button  style={bgHidden}><a className='twitter'><i className='icofont-twitter'></i></a></button>
              </li>
              <li>
                <button  style={bgHidden}><a className='linkedin'><i className='icofont-linkedin'></i></a></button>
              </li>
              <li>
                <button   style={bgHidden}><a className='instagram'><i className='icofont-instagram'></i></a></button>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
   </div>
  )
}

export default Signup