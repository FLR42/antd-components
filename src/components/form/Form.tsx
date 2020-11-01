import { Alert, Button, Form as AntForm, Input } from 'antd'
import { FormItemProps, FormProps as AntFormProps } from 'antd/lib/form'
import React from 'react'
import { MAX_TEXT_FIELD_LENGTH } from 'utils'

interface FormItems extends FormItemProps {
  children?: React.ReactNode
}

export interface FormProps extends AntFormProps {
  items: FormItems[]
  submitButton?: (buttonProps: {
    loading?: boolean
    type: 'primary'
    htmlType: 'submit'
  }) => React.ReactNode
  loading?: boolean
  formError?: string
}

export const Form = (props: FormProps) => (
  <AntForm {...props}>
    {props.items.map((item, i) => {
      const initialRules = item.rules ? [...item.rules] : []

      const rules = initialRules.map((rule) => {
        if ((rule as any).required) {
          return {
            required: true,
            message: `${item.label} is required`
          }
        }

        return rule
      })

      if ((item.children as any)?.type?.prototype === Input.prototype) {
        rules.push({ max: MAX_TEXT_FIELD_LENGTH })
      }

      return (
        <AntForm.Item key={i} {...item} rules={rules}>
          {item.children}
        </AntForm.Item>
      )
    })}
    {Boolean(props.formError) && (
      <Alert message={props.formError} type='error' />
    )}
    <br />
    {props.submitButton ? (
      props.submitButton({
        loading: props.loading,
        type: 'primary',
        htmlType: 'submit'
      })
    ) : (
      <Button loading={props.loading} type='primary' htmlType='submit'>
        Submit
      </Button>
    )}
  </AntForm>
)
