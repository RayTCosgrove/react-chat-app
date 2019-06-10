import React from "react";
import ReactDOM from "react-dom"
import Message from "./Message"


class MessageList extends React.Component {

    componentDidUpdate() {
        const node = ReactDOM.findDOMNode(this);

        if (node.scrollTop + node.clientHeight + 100 >= node.scrollHeight) {
            node.scrollTop = node.scrollHeight;
        }
    }



    render() {
        if (!this.props.roomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>)
        }
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <Message key={index} content={message} />

                    )
                })}
            </div>
        );
    }


}

export default MessageList