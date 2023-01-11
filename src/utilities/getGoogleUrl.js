import request from 'lib/utilities/request'

export const getGoogleUrl = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount'

  const options = {
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL || 'http://localhost:8000/oauth/google',
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: 'offline',
    prompt: 'consent',
    response_type: 'code',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  }

  const qs = new URLSearchParams(options)

  return `${ rootUrl }?${ qs.toString() }`
}

export const loginWithGoogle = event => {
  if (event.origin !== 'http://localhost:8000') {
    return
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks

  request('http://localhost:1000/oauth/google', null, { code: event.data.payload.code })

  event.target.removeEventListener('message', loginWithGoogle)
}
