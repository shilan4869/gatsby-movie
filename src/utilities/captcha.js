import { cls, create } from 'src/utilities/dom'

const sitekey = process.env.GATSBY_GOOGLE_RECAPTCHA

let loading = null
let visible = false

const visibility = (_visible = visible) => {
  visible = _visible

  const [ badge ] = cls('grecaptcha-badge')

  if (!badge) {
    return
  }

  if (_visible) {
    badge.classList.add('visible')
  } else {
    badge.classList.remove('visible')
  }
}

export const show = () => visibility(true)

export const hide = () => visibility(false)

export const load = () => {
  loading = loading || new Promise(resolve => {
    create('script', { src: `https://www.google.com/recaptcha/api.js?onload=onloadrecaptcha&render=${ sitekey }`, async: true })

    window.onloadrecaptcha = () => {
      visibility()
      window.grecaptcha.ready(resolve)
    }
  })

  return loading
}

const captcha = async action => {
  if (!action) {
    throw Error('captcha action must be specified')
  }

  if (!sitekey) {
    return Promise.resolve()
  }

  await load()

  return window.grecaptcha.execute(sitekey, { action })
}

export default captcha
