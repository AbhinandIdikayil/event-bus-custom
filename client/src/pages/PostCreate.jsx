import React, { useState } from 'react'
import axios from 'axios'
function PostCreate() {
    const [title, setTitle] = useState('')
    async function onSubmit (e) {
        e.preventDefault();
        await axios.post('http://localhost:1000/posts' , {
            title
        })
        setTitle('')
    }
    return (
        <div className='h-1/2 w-full bg-white flex-col text-2xl justify-center items-center'>
                <span>create post</span>
                <form action="" className='w-1/2' onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='bg-white border-2' />
                    </div>
                    <button type='submit' className='bg-blue-500 px-3 py-2 rounded-md flex justify-center items-center m-2'>submit</button>
                </form>
        </div>
    )
}

export default PostCreate