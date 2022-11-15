import * as yup from 'yup'

export const slideSchema = yup.object().shape({
  title: yup.string().min(1).max(200),
  isLive: yup.boolean(),
  isPrivate: yup.boolean()
})
