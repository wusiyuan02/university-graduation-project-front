import React, { useEffect, useState } from 'react'

import { Layout, Avatar, Modal, Input, message } from 'antd'
import { ApartmentOutlined, LikeOutlined } from '@ant-design/icons'

import {
  getMomentAll,
  postMomentLikeChange,
  postMomentCommentAdd
} from '@apis/community'

const CommunityPage = ({ userInfo }) => {
  const [moments, setMoments] = useState([])
  const [comment, setComment] = useState('')
  const [addCommentsVisible, setAddCommentsVisible] = useState(false)
  const [currentMoment, setCurrentMoment] = useState({})
  useEffect(() => {
    getMoments()
  }, [])

  // 获取动态数据
  const getMoments = async () => {
    try {
      const result = await getMomentAll()
      if (result.code === 0) {
        setMoments(result.data)
      }
    } catch (err) {
      message.error(err)
    }
  }

  // 点击点赞按钮
  const handleLike = (moment, index) => {
    const { username } = userInfo
    let change
    if (moment.likePeople.includes(username)) {
      const targetIndex = moment.likePeople.findIndex(
        item => item.username === username
      )
      moment.likePeople.splice(targetIndex, 1)
      moments[index] = moment
      change = 1
    } else {
      moment.likePeople.push(username)
      moments[index] = moment
      change = 0
    }
    postMomentLikeChange({ id: moment._id, username, change })
    setMoments([...moments])
  }

  // 新增评论
  const handleCommentAdd = () => {
    const { username } = userInfo
    setAddCommentsVisible(false)
    postMomentCommentAdd({
      username,
      momentId: currentMoment._id,
      content: comment
    }).then(res => {
      const { data } = res
      const target = moments.findIndex(
        moment => moment._id === currentMoment._id
      )
      moments[target].comments.push(data)
      setMoments([...moments])
    })
  }

  return (
    <Layout style={{ height: 'calc(100vh - 390px)' }}>
      <Layout.Content>
        {moments.length > 0 ? (
          moments.map((moment, index) => {
            return (
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #ededed',
                  marginBottom: '16px',
                  paddingBottom: '16px'
                }}
                key={moment._id}
              >
                <div
                  style={{
                    display: 'flex',
                    padding: 16,
                    borderBottom: '1px solid #ededed'
                  }}
                >
                  <Avatar
                    src={moment.writerAvatar}
                    size={60}
                    style={{ marginRight: 16 }}
                  />
                  <div>
                    <div style={{ marginTop: 8, marginBottom: 8 }}>
                      {moment.writerNickname || moment.writerUsername}
                    </div>
                    <div>{moment.addTime}</div>
                  </div>
                </div>
                <div>
                  <p style={{ paddingLeft: 12, paddingTop: 12 }}>
                    {moment.content}
                  </p>
                </div>
                {moment.pimg?.length > 0 && (
                  <div style={{ padding: 12 }}>
                    {moment.pimg.map((img, index) => (
                      <img
                        width={100}
                        height={100}
                        src={img}
                        key={index}
                        style={{ marginRight: 12 }}
                      />
                    ))}
                  </div>
                )}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 12px'
                  }}
                >
                  <div>
                    <LikeOutlined
                      style={{
                        fontSize: 16,
                        cursor: 'pointer',
                        color: moment.likePeople.includes(userInfo.username)
                          ? 'red'
                          : 'black'
                      }}
                      onClick={() => handleLike(moment, index)}
                    />
                    {moment.likePeople.join(',').length > 30
                      ? moment.likePeople.join(', ').slice(0, 30) + '...'
                      : moment.likePeople.join(', ')}
                    {moment.likePeople.length > 0 && (
                      <span>共 {moment.likePeople.length} 个用户点赞</span>
                    )}
                  </div>
                  <ApartmentOutlined
                    style={{ fontSize: 16, cursor: 'pointer' }}
                    onClick={() => {
                      setCurrentMoment(moment)
                      setAddCommentsVisible(true)
                    }}
                  />
                </div>
                {moment?.comments?.length > 0 && (
                  <div
                    style={{
                      padding: '0 12px'
                    }}
                  >
                    {moment.comments.map(comment => (
                      <div key={comment.id} style={{ margin: '4px 0' }}>
                        {comment.writer || '未知用户'}: {comment.content}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <div style={{ textAlign: 'center' }}>暂无数据</div>
        )}
      </Layout.Content>
      <Layout.Sider style={{ backgroundColor: '#fff', padding: 10 }}>
        <h2>好友推荐</h2>
      </Layout.Sider>
      <Modal
        title="新增评论"
        open={addCommentsVisible}
        onCancel={() => setAddCommentsVisible(false)}
        onOk={handleCommentAdd}
        height={400}
      >
        <Input.TextArea
          value={comment}
          style={{ height: 200 }}
          onChange={({ target: { value } }) => setComment(value)}
        />
      </Modal>
    </Layout>
  )
}

export default CommunityPage
