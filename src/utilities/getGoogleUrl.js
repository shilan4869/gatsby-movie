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

export const getUserByGoogleCode = async code => {
  const response = await request('http://localhost:1000/oauth/google', null, { code })

  if (response && response.data && response.data.username) {
    return response.data
  }

  return null
}
