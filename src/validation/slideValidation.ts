import * as yup from 'yup'

export const slideSchema = yup.object().shape({
  title: yup.string().min(1).max(200),
  link: yup.string().matches(/[A-Za-z0-9]/i, 'invalid shortened link'),
  isLive: yup.boolean(),
  isPrivate: yup.boolean()
})
