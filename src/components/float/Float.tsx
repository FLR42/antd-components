import React from 'react'
import styled from 'styled-components'

const Base = styled.div<{ float: 'left' | 'right' }>`
  float: ${(p) => p.float};
`

interface FloatProps {
  float: 'left' | 'right'
  children: React.ReactChildren | React.ReactChild
}

export const Float = ({ float, children }: FloatProps) => (
  <Base float={float}>{children}</Base>
)
