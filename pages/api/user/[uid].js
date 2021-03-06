import prisma from 'lib/prisma'

export default async function userHandler({ query: { uid } }, res) {
  const user = await prisma.user.findUnique({
    where: { uid }
  })

  // User with uid exists
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404).json({ message: `User with uid: ${uid} not found.` })
  }
}
