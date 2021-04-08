import React from 'react';
import button from '../../../assets/btn_google_signin_dark_normal_web.png';
import buttonFocus from '../../../assets/btn_google_signin_dark_focus_web.png';
import buttonPressed from '../../../assets/btn_google_signin_dark_pressed_web.png';

const Google = () => {

  const handleGoogleLogin = () => {
    window.location.href = '/google-login';
  }

  return(
  <div className="google-container">
    <hr />
    <h5>OR</h5>
    <img src={button} alt="Login with Google" onClick={handleGoogleLogin}/>
  </div>
  );
};

export default Google;
