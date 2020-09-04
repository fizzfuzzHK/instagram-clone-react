import React from 'react';
import {Input, Button} from '@material-ui/core'
import './Loginform.css'

const Loginform = (props) => {
    console.log(props);
    
    return (
        <div>
        <form className="loginForm__signup">
        <center>
             <img 
          className="app__headerImage"
          src="https://en.instagram-brand.com/wp-content/themes/ig-branding/prj-ig-branding/assets/images/ig-logo-black.svg"
          alt=""
        />
        </center>
        <Input  
            placeholder="username"
            type="text"
            value={props.username}
            onChange={(e) => {props.setUsername(e.target.value)}}
        />
        <Input 
            placeholder="Email"
            type="text"
            value={props.Email}
            onChange={(e) => {props.setEmail(e.target.value)}}
        />
         <Input 
            placeholder="password"
            type="password"
            value={props.password}
            onChange={(e) => {props.setPassword(e.target.value)}}
        />
        <Button type="submit" onClick={props.signUp}>SIGN UP</Button>
        </form>
        </div>
    );
};

export default Loginform;