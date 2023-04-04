import React from 'react'

import style from './index.module.less'
const MessageBubbles = ({ username, sendUsername, content, time }) => {
  const isSelfSend = username === sendUsername

  return <>
    <div>{time}</div>
    <div style={{ textAlign: isSelfSend ? 'right' : 'left' }}>
      <span className={isSelfSend ? style.myMessageBubble : style.otherMessageBubble}>{content}</span>
    </div></>
}

export default MessageBubbles
