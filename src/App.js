import React, { useState, useEffect} from 'react'
import './App.css';
import Post from './Post'
import {db, auth} from './firebase'
import SimpleModal from './components/Modal';
import { Button } from '@material-ui/core';
import ImageUpload from './components/ImageUpload'
import Header from './Header'

const App = () => {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser)
      } else {
        setUser(null)
      }
    })

    return () => {
      // performe some cleanup actions
      unsubscribe();
      
    }
  }, [user, username])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
      })))
    })
  }, [])
  
  console.log(posts)
  console.log(username)
  // const signUp = (event) => {
  //   event
  // }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      authUser.user.updateProfile({
       displayName: username 
      })
    })
    // .then((authUser) => setUser(authUser))
    .catch((error) => alert(error.message))

    setOpen(false)
  }

  const signIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    // .then((authUser) => setUser(authUser))
    .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }

  const loginFormProps = {
    username: username,
    password: password,
    email: email,
    setUsername: setUsername,
    setPassword: setPassword,
    setEmail: setEmail,
    signUp: signUp
  }

  console.log(user)

  return (
    <div className="app">
      <div className="app__body">
        <div className="app__header">
            {user ? (
              <Header className="app__header" user={user.displayName}/>
            ) : (
              <Header className="app__header" user={""}/>
            )}
        </div>
        <div className="app__main">
          <div className="app__main__left">
            {user?.displayName ? (
            
              posts.map(({id, post}) => (
                console.log(post),
                <Post key={id} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} loginuser={user.displayName}/>
              ))
            ) : (
              posts.map(({id, post}) => (
                console.log(post),
                <Post key={id} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
              ))
            )
            }
            </div>
          <div className="app__main__right">
            <div className="app__login">
              {user?.displayName ? (
                <ImageUpload username={user.displayName}/>  
              ): (
                <h3>Sorry you need to login to upload</h3>
              )}
              
              <SimpleModal 
                handleOpen={handleOpen} 
                handleClose={handleClose} 
                open={open}
                openSignIn={openSignIn}
                setOpenSignIn={setOpenSignIn}
                signIn={signIn}
                {...loginFormProps}
              />
              {user ? (
                <Button onClick={() => auth.signOut()}>Logout</Button> 
              ):(
              <div className="app__loginContainer">
                <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                <Button onClick={() => setOpen(true)}>Sign Up</Button>
              </div>
              )}
              </div>
            </div>
        </div>  
      </div>
    </div>
  );
}

export default App;
