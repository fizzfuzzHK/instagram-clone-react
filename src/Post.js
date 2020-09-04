import React from 'react';
import './Post.css'
import Avatar from "@"

const Post = () => {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt='fizzfuzz'
                    src="/static/images/avatar/1.jpg"
                />
                <h3>Username</h3>
            </div>
                       {/* header -> avatar + username */}

            <img className="post__image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Nine_Inch_Nails_logo.svg/400px-Nine_Inch_Nails_logo.svg.png" />
            {/* image */}

            <h4 className="post__text"><strong>fizzfuzz </strong>NIN Logo</h4>
            {/* username + caption */}

        </div>
    );
};


export default Post;