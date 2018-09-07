import React from 'react'

class Message extends React.Component {
  render() {
    return (
      <div className='msg'>
        <span className={ this.props.type }>{ this.props.message }</span>
      </div>
    )
  }
}

export default Message;
