import React, { useState, useEffect} from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar"
import {db, auth} from './firebase'
import PostComment from './components/PostComment'


const Post = ({postId, username, caption, imageUrl, loginuser}) => {
    const [comments,setComments] = useState([])

    useEffect(() => {
        let unsubscribe
        if (postId) {
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments").orderBy('timestamp')
            .onSnapshot((snapshot) => 
            
            {
                setComments(snapshot.docs.map((doc) => doc.data()))
            })
        }

        return () => {
            unsubscribe()
        }
    },[postId])

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

            <h4 className="post__text"><strong>{username} </strong>{caption}</h4>
            {/* username + caption */}
            <div className="post__comments">
                {comments.map((comment) => (
                    <h4 className="post__comment">
                        <strong>{comment.username}</strong> {comment.text}
                    </h4>
                ))
                }
            </div>
            <PostComment postId={postId} loginuser={loginuser}/>
        </div>
    );
};


export default Post;