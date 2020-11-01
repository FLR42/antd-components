import { ArrowRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

interface LinkProps {
  children: string
  onClick?: () => void
}

export const Link = ({ children, onClick = () => {} }: LinkProps) => (
  <Button type='link' onClick={onClick}>
    {children} <ArrowRightOutlined />
  </Button>
)
