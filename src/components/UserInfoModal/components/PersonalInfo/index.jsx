import React from 'react'

import { Col, Row, Tag } from 'antd'
import { COLOR_LIST, TAGS_OPTIONS } from '../../../../constants'

const PersonalInfo = ({ userInfo }) => {
  return (
    <Row>
      <Col span={6}>描述自己的标签:</Col>
      <Col span={18}>
        {userInfo.personTags.map((tagValue, index) => (
          <Tag color={COLOR_LIST[index]} key={tagValue}>
            {TAGS_OPTIONS.find(option => option.value === tagValue)?.label ||
              tagValue}
          </Tag>
        ))}
      </Col>

      <Col span={6}>描述心仪的标签:</Col>
      <Col span={18}>
        {userInfo.loveTags.map((tagValue, index) => (
          <Tag color={COLOR_LIST[index]} key={tagValue}>
            {TAGS_OPTIONS.find(option => option.value === tagValue)?.label ||
              tagValue}
          </Tag>
        ))}
      </Col>

      <Col span={6}>
        内<span style={{ color: 'red' }}>♥</span>独白:
      </Col>
      <Col span={18}>{userInfo.innerMonologue}</Col>
    </Row>
  )
}

export default PersonalInfo
