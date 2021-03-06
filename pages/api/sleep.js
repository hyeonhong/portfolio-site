// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  res.statusCode = 200
  res.json({ sleep: 'test' })

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  console.log('before sleep')
  await sleep(5000)
  console.log('after sleep')
}
