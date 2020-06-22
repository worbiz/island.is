import React from 'react'
import { FormikState, FieldInputProps } from 'formik'
import get from 'lodash/get'
import { RadioButton } from '../RadioButton/RadioButton'
import { Typography } from '../..'
import InputError from '../InputError/InputError'
import { Box } from '../Box/Box'
import Tooltip from '../Tooltip/Tooltip'

export interface FieldPolarQuestionProps {
  label?: string
  positiveLabel?: string
  negativeLabel?: string
  reverse?: boolean
  tooltip?: string
  field?: FieldInputProps<boolean>
  form?: FormikState<string | number>
}

const RadioButtonMapped = ({
  field,
  value,
  onChange,
  ariaError,
  idPostfix,
  fixedValue,
  label,
}) => (
  <RadioButton
    {...field}
    label={label}
    id={`${field.name}${idPostfix}`}
    checked={value === fixedValue}
    onChange={() => {
      onChange({
        target: {
          name: field.name,
          value: fixedValue,
        },
      })
    }}
    {...ariaError}
  />
)

export const FieldPolarQuestion = ({
  label,
  positiveLabel,
  negativeLabel,
  reverse,
  tooltip,
  field: { onChange, value, ...field },
  form: { touched, errors },
}: FieldPolarQuestionProps) => {
  const nameArray = (field.name && field.name.split('.')) || []
  const hasError = !!(get(touched, nameArray) && get(errors, nameArray))
  const errorMessage = get(errors, nameArray)
  const ariaError = hasError
    ? {
        'aria-invalid': true,
        'aria-describedby': field.name,
      }
    : {}
  const RadioButtonProps = {
    field,
    value,
    onChange,
    ariaError,
  }
  const posRadioButton = {
    idPostfix: '-pos',
    fixedValue: true,
    label: positiveLabel,
  }
  const negRadioButton = {
    idPostfix: '-neg',
    fixedValue: false,
    label: negativeLabel,
  }

  return (
    <Box>
      <Box marginBottom={2}>
        <Typography variant="h4" as="span">
          {label}{' '}
          <Box marginLeft={2} display="inlineBlock">
            <Tooltip text={tooltip} />
          </Box>
        </Typography>
      </Box>
      <Box marginRight={4} display="inlineBlock">
        <RadioButtonMapped
          {...RadioButtonProps}
          {...(reverse ? negRadioButton : posRadioButton)}
        />
      </Box>
      <Box display="inlineBlock">
        <RadioButtonMapped
          {...RadioButtonProps}
          {...(!reverse ? negRadioButton : posRadioButton)}
        />
      </Box>

      {hasError && errorMessage && (
        <InputError id={field.name} errorMessage={errorMessage} />
      )}
    </Box>
  )
}

export default FieldPolarQuestion
