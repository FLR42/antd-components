import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space, Table as AntTable } from 'antd'
import { TableProps as AntTableProps } from 'antd/lib/table'
import humanize from 'humanize-string'
import React, {
  Fragment,
  ReactText,
  useCallback,
  useRef,
  useState
} from 'react'
import Highlighter from 'react-highlight-words'

export interface TableBaseProps {
  selectable?: boolean
  actionButton?: {
    text: string
    onClick: (text: string) => void
  }
}

type TableProps = AntTableProps<any> & TableBaseProps

export function Table(props: TableProps) {
  const searchInput = useRef<Input | null>(null)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([])

  const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }, [])

  const handleReset = useCallback((clearFilters) => {
    clearFilters()
    setSearchText('')
  }, [])

  const getColumnSearchProps = ({
    dataIndex,
    render
  }: {
    dataIndex: string
    render?: (v: number | string) => string
  }) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput.current = node
          }}
          placeholder={`Search ${humanize(String(dataIndex)).toLowerCase()}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => (searchInput.current as Input).select(), 100)
      }
    },
    render: (v: string) => {
      const text = render ? render(v) : v

      return searchedColumn === dataIndex ? (
        <Fragment>
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text}
          />
        </Fragment>
      ) : (
        text
      )
    }
  })

  const initialColumns = props.columns ? [...props.columns] : []
  const columns = initialColumns.map((value: any) => ({
    ...value,
    sorter: (a: any, b: any) => {
      if (typeof a[value.dataIndex] === 'number') {
        return a[value.dataIndex] - b[value.dataIndex]
      }
      return a[value.dataIndex].localeCompare(b[value.dataIndex])
    },
    key: value.dataIndex,
    ...getColumnSearchProps(value)
  }))

  if (props.actionButton) {
    columns.push({
      dataIndex: 'actionButton',
      render: (text: string) => (
        <Button onClick={() => (props.actionButton as any).onClick(text)}>
          {props.actionButton?.text}
        </Button>
      )
    })
  }

  const rowSelection = {
    selections: [AntTable.SELECTION_ALL, AntTable.SELECTION_INVERT],
    onChange: (selectedRowKeys: ReactText[], selectedRows: any[]) => {
      if (props.rowSelection?.onChange) {
        props.rowSelection.onChange(selectedRowKeys, selectedRows)
      }
      setSelectedRowKeys(selectedRowKeys)
    },
    selectedRowKeys
  }

  let pagination = { showSizeChanger: true }
  if (props.pagination) {
    pagination = { ...pagination, ...props.pagination }
  }

  return (
    <AntTable
      {...props}
      columns={columns}
      rowSelection={
        props.selectable ? { ...rowSelection, type: 'checkbox' } : undefined
      }
      pagination={pagination}
    />
  )
}
