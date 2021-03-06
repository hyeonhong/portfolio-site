import { verifyIdToken } from 'utils/auth/firebaseAdmin'
const favoriteFoods = ['pizza', 'burger', 'chips', 'tortilla']

const getFood = async (req, res) => {
  const { token } = JSON.parse(req.headers.authorization || '{}')
  if (!token) {
    return res.status(403).send({
      errorCode: 403,
      message: 'Auth token missing.'
    })
  }

  try {
    await verifyIdToken(token)
    return res.status(200).json({
      food: favoriteFoods[Math.floor(Math.random() * favoriteFoods.length)]
    })
  } catch (error) {
    return res.status(401).send({ message: 'You are not authorized' })
  }
}

export default getFood
