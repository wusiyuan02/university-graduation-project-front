import React from 'react'

import style from './index.module.less'
const MessageBubbles = ({ username, sendUsername, content, time, isRead }) => {
  const isSelfSend = username === sendUsername

  return <>
    <div>{time}</div>
    <div style={{ textAlign: isSelfSend ? 'right' : 'left' }}>
      {isSelfSend && (isRead ? '已读' : '未读')}<span className={isSelfSend ? style.myMessageBubble : style.otherMessageBubble}>{content}</span>
    </div></>
}

export default MessageBubbles
