import React, { useState, useEffect} from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar"
import {db, auth} from './firebase'
import PostComment from './components/PostComment'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const Post = ({postId, username, caption, imageUrl, loginuser}) => {
    const [comments,setComments] = useState([])
    const [showAllComments, setShowAllComments] = useState(false)

    useEffect(() => {
        let unsubscribe
        if (postId) {
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments").orderBy('timestamp')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()))
            })
        }

        return () => {
            unsubscribe()
        }
    },[])

    const handlelike = () => {

    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>
                       {/* header -> avatar + username */}

            <img className="post__image" src={imageUrl} />
            {/* image */}

            <div className="post__utility">
                <FavoriteBorderIcon className="post__icons" onClick={() => handlelike()}/>
                <SendIcon className="post__icons"/>
            </div>

            <h4 className="post__text"><strong>{username} </strong>{caption}</h4>
            {/* username + caption */}

            {showAllComments ? (
                <div className="post__comments">
                {comments.map((comment) => (
                    <h4 className="post__comment">
                        <strong>{comment.username}</strong> {comment.text}
                    </h4>
                ))
                }
                <Button onClick={() => setShowAllComments(false)}>隠す</Button>

            </div>
            ) : (
                <div className="post__showComment__button">
                    <Button 
                        onClick={() => setShowAllComments(true)}>コメント{comments.length}件をすべて見る
                    </Button>
                </ div>
            )}
            
            <PostComment postId={postId} loginuser={loginuser}/>
        </div>
    );
};


export default Post;