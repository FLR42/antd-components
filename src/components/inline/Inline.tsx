import React from 'react'
import styled from 'styled-components'

const Base = styled.div`
  display: flex;
`

const Container = styled.div`
  margin-right: 16px;
`

interface InlineProps {
  children: React.ReactChild[]
}

export const Inline = ({ children }: InlineProps) => {
  return (
    <Base>
      {children.map((child, i) => (
        <Container key={i}>{child}</Container>
      ))}
    </Base>
  )
}
