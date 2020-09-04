import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Input, Button} from '@material-ui/core'
import './Modal.css'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  console.log(props)
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);


  const signUpBody = (
    <div style={modalStyle} className={classes.paper}>
        
        <div>
        <form className="modal__signUp">
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
    </div>
  );

  const signInBody = (
    <div style={modalStyle} className={classes.paper}>

    <div>
    <form className="modal__signIn">
    <center>
         <img 
      className="app__headerImage"
      src="https://en.instagram-brand.com/wp-content/themes/ig-branding/prj-ig-branding/assets/images/ig-logo-black.svg"
      alt=""
    />
    </center>
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
    <Button type="submit" onClick={props.signIn}>SIGN IN</Button>
    </form>
    </div>
    </div>
  )


  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {signUpBody}
      </Modal>

      <Modal
        open={props.openSignIn}
        onClose={() => props.setOpenSignIn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {signInBody}
      </Modal>
    </div>
  );
}

