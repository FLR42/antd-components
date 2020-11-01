import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, message, Row, Space, Typography } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table'
import pluralize from 'pluralize'
import React, {
  Fragment,
  ReactNode,
  ReactText,
  useCallback,
  useState
} from 'react'
import { useHistory } from 'react-router-dom'
import { StandardReturn } from 'utils'
import { DeleteConfirmation } from '../delete-confirmation'
import { Table, TableBaseProps } from '../table'

interface StandardTableBaseProps {
  title: string
  addRoute?: string
  editRoute?: string
  columns?: any[]
  dataSource?: any[]
  loading?: boolean
  handleDelete?: (params: {
    selectedRowKeys: ReactText[]
    selectedRows: any[]
  }) => Promise<StandardReturn>
  extras?:
    | ReactNode
    | ((params: {
        selectedRowKeys: ReactText[]
        selectedRows: any[]
      }) => ReactNode)
  showExtras?: false | { add: boolean; edit: boolean; delete: boolean }
  showDeleteMessage?: boolean
  pagination?: TablePaginationConfig
}

export type StandardTableProps = StandardTableBaseProps & TableBaseProps

export const StandardTable = ({
  title,
  addRoute = '',
  editRoute = '',
  columns = [],
  dataSource = [],
  loading = false,
  handleDelete = async () => ({ success: true }),
  extras,
  showExtras = { add: true, edit: true, delete: true },
  selectable = true,
  showDeleteMessage = true,
  actionButton,
  pagination
}: StandardTableProps) => {
  const history = useHistory()
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([])
  const [deleteLoading, setDeleteLoading] = useState(false)

  const rowSelection = {
    onChange: (selectedRowKeys: ReactText[], selectedRows: any[]) => {
      setSelectedRows(selectedRows)
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  const deleteItems = useCallback(async () => {
    if (deleteLoading) return

    setDeleteLoading(true)

    const res = await handleDelete({ selectedRows, selectedRowKeys })

    if (showDeleteMessage) {
      if (res.success) {
        message.success('Items deleted successfully')
      } else {
        message.error(res.error)
      }
    }

    setDeleteLoading(false)
  }, [
    deleteLoading,
    handleDelete,
    selectedRowKeys,
    selectedRows,
    showDeleteMessage
  ])

  return (
    <Table
      title={() => (
        <Row justify='space-between' align='middle'>
          <Col>
            <Typography.Title level={5}>{title}</Typography.Title>
          </Col>
          <Col>
            <Space>
              {showExtras && (
                <Fragment>
                  {showExtras.add && (
                    <Button
                      data-test={`standard-table-add-${pluralize.singular(
                        title.toLowerCase()
                      )}-btn`}
                      onClick={() => history.push(addRoute)}
                      icon={<PlusOutlined />}
                    >
                      Add
                    </Button>
                  )}
                  {showExtras.edit && (
                    <Button
                      data-test={`standard-table-edit-${pluralize.singular(
                        title.toLowerCase()
                      )}-btn`}
                      disabled={!(selectedRowKeys.length === 1)}
                      onClick={() => {
                        history.push(editRoute, {
                          selectedRowKeys,
                          selectedRows
                        })
                      }}
                      icon={<EditOutlined />}
                    >
                      Edit
                    </Button>
                  )}
                  {showExtras.delete && (
                    <DeleteConfirmation onConfirm={deleteItems}>
                      <Button
                        data-test={`standard-table-delete-${pluralize.singular(
                          title.toLowerCase()
                        )}-btn`}
                        loading={deleteLoading}
                        disabled={selectedRowKeys.length < 1}
                        icon={<DeleteOutlined />}
                      >
                        Delete
                      </Button>
                    </DeleteConfirmation>
                  )}
                </Fragment>
              )}
              {typeof extras === 'function'
                ? extras({ selectedRowKeys, selectedRows })
                : extras}
            </Space>
          </Col>
        </Row>
      )}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowSelection={{ type: 'checkbox', ...rowSelection }}
      selectable={selectable}
      actionButton={actionButton}
      pagination={pagination}
    />
  )
}
