import React from 'react';


function Message(props) {

    return (
    <div className="message">
        <div className="message-username">{props.content.senderId}</div>
        <div className="message-text">{props.content.parts[0].payload.content}</div>
    </div>
    )

}
export default Message