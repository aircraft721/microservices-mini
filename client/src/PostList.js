import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CommentCreate } from './CommentCreate';
import { CommentList } from './CommentList';

export const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');

        setPosts(res.data);
    }

    useEffect(() => {
        fetchPosts();
    }, [])
    console.log('posts', posts)
    return (
        <div>
            {Object.values(posts).map((post, index) => {
                return (
                    <div key={index}>
                        <h3>{post.title}</h3>
                        <CommentList comments={post.comments} />
                        <CommentCreate postId={post.id} />
                    </div>
                )
            })}
        </div>
    )
}
