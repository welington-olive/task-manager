import React from 'react'
import styled from 'styled-components/native'
import { theme } from '../styles/global'

const Container = styled.View`
  flex-direction: row;
  margin-bottom: ${theme.spacing.md}px;
`

export interface StatusContainerProps {
  children: React.ReactNode
}

export const StatusContainer: React.FC<StatusContainerProps> = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
} 