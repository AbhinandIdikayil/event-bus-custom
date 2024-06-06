import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CommentCreate from '../components/CommentCreate'
import CommentList from '../components/CommentList'

function PostList() {
    const [posts, setPosts] = useState({})

    const fetchPost = async () => {
        const res = await axios.get('http://localhost:3000/posts')
        setPosts(res.data)
    }
    useEffect(() => {
        fetchPost()
    },[])
    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div className='w-100 border-2 px-5 py-4 bg-yellow-100'>
                <h3>{post?.title}</h3>
                <CommentList comments={post.comments} />
                <CommentCreate postId={post.id} />
            </div>
        )
    })
    console.log(posts)
    return (
        <div className='flex gap-5'>
            
            {renderedPosts}

        </div>
    )
}

export default PostList