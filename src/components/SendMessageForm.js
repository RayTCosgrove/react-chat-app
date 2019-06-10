import React from 'react'

class SendMessageForm extends React.Component {

    constructor() {
        super()

        this.state = {
            message: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({
            message: event.target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state.message)
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
        })
    }

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    disabled={this.props.disabled}
                    onChange={
                        this.handleChange
                    }
                    placeholder="Type a message and hit enter!"
                    type="text"
                    value={this.state.message}
                />
            </form>)
    }


}

export default SendMessageForm