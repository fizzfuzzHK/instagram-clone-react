import React from 'react';
import './Post.css'
import Avatar from "@material-ui/core/Avatar"

const Post = (props) => {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt='fizzfuzz'
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{props.username}</h3>
            </div>
                       {/* header -> avatar + username */}

            <img className="post__image" src={props.imageUrl} />
            {/* image */}

            <h4 className="post__text"><strong>{props.username} </strong>{props.caption}</h4>
            {/* username + caption */}

        </div>
    );
};


export default Post;