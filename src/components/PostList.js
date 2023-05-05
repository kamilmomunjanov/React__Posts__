import React from 'react';
import PostItem from "./PostItem";

const PostList = ({posts, title, remove}) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: "center"}}>Posts is not</h1>
        )
    }
    return (
        <>
            <h1 style={{textAlign:"center"}}>{title}</h1>
            {posts.map((post, idx) =>
                <PostItem remove={remove} number={idx + 1} post={post} key={post.id}/>
            )}
        </>
    );
};

export default PostList;