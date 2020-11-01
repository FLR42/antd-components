import { InboxOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import { DraggerProps } from 'antd/lib/upload/Dragger'
import React from 'react'

export const FileUpload = (props: DraggerProps) => (
  <Upload.Dragger
    {...props}
    name='file'
    customRequest={({ onSuccess, file }) => onSuccess({}, file)}
    accept='image/x-png,image/gif,image/jpeg'
  >
    <p className='ant-upload-drag-icon'>
      <InboxOutlined />
    </p>
    <p className='ant-upload-text'>Click or drag file to this area to upload</p>
  </Upload.Dragger>
)
