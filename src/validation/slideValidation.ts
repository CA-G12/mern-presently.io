import * as yup from 'yup'

export const slideSchema = yup.object().shape({
  title: yup.string().min(4).max(200),
  link: yup
    .string()
    .matches(/rebrand.ly\/[A-Za-z0-9]/i, 'invalid shortened link'),
  isLive: yup.boolean(),
  isPrivate: yup.boolean()
})
