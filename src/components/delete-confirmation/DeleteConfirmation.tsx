import { Popconfirm } from 'antd'
import React, { ReactNode } from 'react'

interface DeleteConfirmationProps {
  children: ReactNode
  onConfirm:
    | ((e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void)
    | undefined
}

export const DeleteConfirmation = ({
  children,
  onConfirm
}: DeleteConfirmationProps) => (
  <Popconfirm
    title='Are you sure you want to delete?'
    onConfirm={onConfirm}
    okText='Yes'
    cancelText='No'
  >
    {children}
  </Popconfirm>
)
