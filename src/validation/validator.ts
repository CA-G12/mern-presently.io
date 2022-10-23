/* eslint-disable @typescript-eslint/no-explicit-any */
import yup from 'yup'

export const validator = async ({
  schema,
  data
}: {
  schema: yup.ObjectSchema<any>
  data: any
}) => {
  const result = { isValid: true, error: '' }

  try {
    await schema.validate(data)
  } catch (error: unknown) {
    const validationError = error as yup.ValidationError

    result.isValid = false
    result.error = validationError.errors[0]
  }

  return result
}
