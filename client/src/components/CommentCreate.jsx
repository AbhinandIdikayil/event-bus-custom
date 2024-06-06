import React, { useState } from 'react'
import axios from 'axios'

function CommentCreate({postId}) {
    const [content, setContent] = useState('')
    async function onSubmit(e) {
        e.preventDefault()
        await axios.post(`http://localhost:2000/posts/${postId}/comments`,{
            content
        })
        setContent('')
    }
    return (
        <div>
            <form action="" onSubmit={onSubmit}>
                <label htmlFor="">New comment</label>
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} className='border-2 bg-transparent' />
                <button>submit</button>
            </form>
        </div>
    )
}

export default CommentCreate