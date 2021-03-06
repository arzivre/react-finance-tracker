//@ts-check
import { useEffect, useState } from 'react'

import { auth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCanceled, setIsCanceled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

    try {
      //sing up
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      // console.log('user', response.user)

      if (!response) {
        throw new Error('Could not complete Sing Up')
      }

      // add display name to user
      await response.user.updateProfile({ displayName })

      //dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user })

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

  return { error, isPending, signup }
}
