import React from 'react'

import { Empty, List } from 'antd'
import ApplicationListItem from '../ApplicationListItem'

const FriendsApplicationModal = ({
  listData,
  onListChange,
  setUserInfo,
  setUserInfoVisible
}) => {
  const handleLiStItemChange = index => {
    listData.splice(index, 1)
    onListChange([...listData])
  }
  return (
    <div style={{ minHeight: 400 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 300
        }}
      >
        {listData.length === 0 ? (
          <Empty />
        ) : (
          <div style={{ height: 300, width: '100%' }}>
            <List
              itemLayout="vertical"
              dataSource={listData}
              renderItem={(item, index) => {
                return (
                  <ApplicationListItem
                    item={item}
                    index={index}
                    onChange={handleLiStItemChange}
                    setUserInfo={setUserInfo}
                    setUserInfoVisible={setUserInfoVisible}
                  />
                )
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default FriendsApplicationModal
