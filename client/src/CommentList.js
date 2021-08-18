import React from 'react';

export const CommentList = ({ comments }) => {
    console.log('comments', comments)
    return (
        <div>
            <ul>
                {comments && comments.length ? comments.map((comment, index) => {
                    let content;

                    if (comment.status === 'approved') {
                        content = comment.content;
                    } else if (comment.status === 'pending') {
                        content = 'This comment is awaiting moderation';
                    } else {
                        content = 'This comment has been rejected';
                    }
                    return (
                        <li key={index}>{content}</li>
                    )
                }) : null}
            </ul>
        </div>
    )
}
