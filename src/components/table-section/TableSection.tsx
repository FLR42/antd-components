import { StandardTable } from 'components/standard-table'
import React from 'react'
import { Section } from '../section'
import { StandardTableProps } from '../standard-table'

interface TableSectionProps {
  title: string
  description: string
  tableProps: StandardTableProps
}

export const TableSection = ({
  title,
  description,
  tableProps
}: TableSectionProps) => (
  <Section title={title} description={description}>
    <StandardTable {...tableProps} />
  </Section>
)
