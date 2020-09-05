import React, { useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {db, auth} from '../firebase'
import Button from '@material-ui/core/Button';
import './PostComment.css'
import firebase from 'firebase'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  
  
const PostComment = ({postId,loginuser}) => {
    const classes = useStyles();

    const [comment,setComment] = useState('')

    const uploadComment = () => {
        if (postId) {
        db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            text: comment,
            username: loginuser
        })
        setComment('')
        }
    }


    return (
        <div className="postComment">
            <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                    id="standard-basic" 
                    label="コメントを入力" 
                    value={comment}
                    onChange={(e) => {setComment(e.target.value)}}
                />
            </form>
            <div className="postComment__button">
                {comment ? (
                <Button color="primary" onClick={() => uploadComment()}>Primary</Button>
                ) : (
                <Button disabled>Disabled</Button>
                )}
            </div>
        </div>
    );
};


export default PostComment;