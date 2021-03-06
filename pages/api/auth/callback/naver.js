import queryString from 'query-string'
import { setCookie } from 'nookies'

import { createCustomToken, getUser, updateUser } from 'utils/auth/firebaseAdmin'

export default async function naver(req, res) {
  const { code, state } = req.query
  const params = {
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
    client_secret: process.env.NAVER_CLIENT_SECRET,
    code,
    state
  }
  const qs = queryString.stringify(params)

  // Get token
  const tokenResponse = await fetch(`https://nid.naver.com/oauth2.0/token?${qs}`)
  const token = await tokenResponse.json()

  // Get uid (email address)
  const profileResponse = await fetch('https://openapi.naver.com/v1/nid/me', {
    headers: {
      Authorization: 'Bearer ' + token.access_token
    }
  })
  const naverResponse = await profileResponse.json()

  // Use Naver's email as uid
  const uid = naverResponse.response.email

  const customToken = await createCustomToken(uid)
  setCookie({ res }, 'customToken', customToken, {
    maxAge: 60 * 60,
    path: '/'
  })

  // Send the token first
  res.statusCode = 200
  const body = '<script>window.close()</script>'
  res.send(body)

  // ASYNC TASK: Set the email if empty
  const user = await getUser(uid)
  if (!user.email) {
    await updateUser(uid, { email: uid })
    console.log('update email complete')
  }
}
