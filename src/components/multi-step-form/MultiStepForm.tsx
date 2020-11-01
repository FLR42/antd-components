import { Button, Card, Result, Steps } from 'antd'
import React, { Fragment, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { StandardReturn } from 'utils'
import { Form, FormProps } from '../form'
import { Section } from '../section'

export interface ResultProps {
  status:
    | 'success'
    | 403
    | 404
    | 500
    | '403'
    | '404'
    | '500'
    | 'error'
    | 'info'
    | 'warning'
  redirect: string
  title: string
  subTitle: string
}

interface StepBase {
  title: string
  description: string
}

export type Act = (
  values: any,
  i: number
) => Promise<{ goToStep: number; res: StandardReturn }>

export interface FormStep extends StepBase {
  type: 'form'
  formProps: FormProps
  act: Act
}

export interface ResultStep extends StepBase {
  type: 'result'
  resultProps: ResultProps
}

export type Step = FormStep | ResultStep

export interface MultiStepFormProps {
  title: string
  description: string
  steps: Step[]
}

export const MultiStepForm = ({
  title,
  description,
  steps
}: MultiStepFormProps) => {
  const history = useHistory()

  const [currentStep, setCurrentStep] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  const handleSubmit = useCallback(
    async (values: any, i) => {
      if (loading) return

      setLoading(true)
      setFormError('')

      const { goToStep, res } = await (steps[i] as FormStep).act(values, i)

      setLoading(false)

      if (!res.success) {
        setFormError(res.error)
        return
      }

      setCurrentStep(goToStep)
    },
    [loading, steps]
  )

  return (
    <Section
      title={title}
      description={description}
      extras={
        <Fragment>
          <br />
          <Steps direction='vertical' current={currentStep}>
            {steps.map((step, i) => (
              <Steps.Step
                key={i}
                title={step.title}
                description={step.description}
              />
            ))}
          </Steps>
        </Fragment>
      }
    >
      {steps.map((step, i) => {
        if (step.type === 'form') {
          return (
            currentStep === i && (
              <Card title={title}>
                <Form
                  {...(step.formProps as FormProps)}
                  loading={loading}
                  formError={formError}
                  onFinish={(values) => handleSubmit(values, i)}
                  submitButton={(buttonProps) =>
                    i < steps.length - 2 ? (
                      <Button {...buttonProps}>Next</Button>
                    ) : (
                      <Button {...buttonProps}>Submit</Button>
                    )
                  }
                />
              </Card>
            )
          )
        } else if (step.type === 'result') {
          const {
            status,
            title,
            subTitle,
            redirect
          } = step.resultProps as ResultProps

          return (
            currentStep === i && (
              <Result
                status={status}
                title={title}
                subTitle={subTitle}
                extra={
                  <Button
                    data-test='multi-step-form-success-step-continue-btn'
                    type='primary'
                    onClick={() => history.push(redirect)}
                  >
                    Continue
                  </Button>
                }
              />
            )
          )
        }

        return null
      })}
    </Section>
  )
}
