import { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [isCanceled, setIsCanceled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    try {
      //sign the user in
      const response = await auth.signInWithEmailAndPassword(email, password)
      //dispatch log in
      dispatch({ type: 'LOGIN', payload: response.user })

      // update state
      if (!isCanceled) {
        setIsPending(false)
        setError(null)
      }
    } catch (error) {
      if (!isCanceled) {
        console.log(error.message)
        setError(error.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCanceled(true)
  }, [])

  return { login, error, isPending }
}
