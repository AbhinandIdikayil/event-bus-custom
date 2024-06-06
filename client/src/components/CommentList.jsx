import React, { useState, useEffect } from 'react'

function CommentList({ comments }) {
   
    const renderComments = comments.map(comment => {
        return (
            <li key={comment.id}>
                {comment.content}
            </li>
        )
    })
    return (
        <div>
            {renderComments}
        </div>
    )
}

export default CommentList