import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Redirect({ to }) {
  const router = useRouter()

  useEffect(() => {
    router.push(to)
  }, [to])

  return null
}
