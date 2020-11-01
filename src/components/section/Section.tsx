import { Col, Row, Typography } from 'antd'
import React from 'react'

export interface SectionProps {
  title: string
  description: React.ReactNode
  children?: React.ReactNode
  extras?: React.ReactNode
}

const exampleProps: SectionProps = {
  title: 'Title',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
}

export const Section = ({
  title = exampleProps.title,
  description = exampleProps.description,
  children = <div />,
  extras = <div />
}: SectionProps) => (
  <Row gutter={[64, 32]}>
    <Col xs={24} md={8}>
      <Typography.Title>{title}</Typography.Title>
      {description}
      <br />
      {extras}
    </Col>
    <Col xs={24} md={16}>
      {children}
    </Col>
  </Row>
)
