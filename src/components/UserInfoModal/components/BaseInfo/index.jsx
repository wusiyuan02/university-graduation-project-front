import React from 'react'

import { Col, Row } from 'antd'

import {
  DEGREE_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  MONTHLY_SALARY_OPTIONS
} from '../../../../constants'

const BaseInfo = ({ userInfo }) => {
  return (
    <Row>
      {userInfo.nickname && (
        <>
          <Col span={6}>昵称:</Col>
          <Col span={18}>{userInfo.nickname}</Col>
        </>
      )}
      {userInfo.username && (
        <>
          <Col span={6}>用户名:</Col>
          <Col span={18}>{userInfo.username}</Col>
        </>
      )}
      {userInfo.height && (
        <>
          <Col span={6}>身高:</Col>
          <Col span={18}>{userInfo.height}</Col>
        </>
      )}
      {userInfo.maritalStatus && (
        <>
          <Col span={6}>婚恋状况:</Col>
          <Col span={18}>
            {
              MARITAL_STATUS_OPTIONS.find(
                option => option.value === userInfo.maritalStatus
              )?.label
            }
          </Col>
        </>
      )}
      {userInfo.telephone && (
        <>
          <Col span={6}>电话:</Col>
          <Col span={18}>{userInfo.telephone}</Col>
        </>
      )}
      {userInfo.qqOrWechat && (
        <>
          <Col span={6}>QQ/微信:</Col>
          <Col span={18}>{userInfo.qqOrWechat}</Col>
        </>
      )}
      {userInfo.email && (
        <>
          <Col span={6}>邮箱:</Col>
          <Col span={18}>{userInfo.email}</Col>
        </>
      )}
      {userInfo.degree && (
        <>
          <Col span={6}>学历:</Col>
          <Col span={18}>
            {
              DEGREE_OPTIONS.find(option => option.value === userInfo.degree)
                ?.label
            }
          </Col>
        </>
      )}
      {userInfo.monthlySalary && (
        <>
          <Col span={6}>月薪:</Col>
          <Col span={18}>
            {
              MONTHLY_SALARY_OPTIONS.find(
                option => option.value === userInfo.monthlySalary
              )?.label
            }
          </Col>
        </>
      )}
    </Row>
  )
}

export default BaseInfo
