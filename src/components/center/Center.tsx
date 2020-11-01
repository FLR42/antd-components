import React from 'react'
import styled from 'styled-components'

const Base = styled.div`
  display: flex;
  justify-content: center;
`

interface CenterProps {
  children: React.ReactChild
}

export const Center = ({ children }: CenterProps) => <Base>{children}</Base>
