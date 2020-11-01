import { CardProps } from 'antd/lib/card'
import React from 'react'
import { Card } from '../card'
import { Center } from '../center'
import { Section, SectionProps } from '../section'

interface CardSectionProps extends SectionProps {
  cardProps: CardProps
  children: React.ReactNode
}

export const CardSection = (props: CardSectionProps) => (
  <Section
    title={props.title}
    description={props.description}
    extras={props.extras}
  >
    <Center>
      <Card {...props.cardProps}>{props.children}</Card>
    </Center>
  </Section>
)
