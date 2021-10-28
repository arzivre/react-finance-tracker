//@ts-check
import { useState } from 'react'

import firebase from '../firebase/config'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      console.log('user', response.user)

      if (!response) {
        throw new Error('Could not complete Sing Up')
      }

      // add display name to user
      await response.user.updateProfile({ displayName })

      setIsPending(false)
      setError(null)
    } catch (error) {
      console.log(error.message)
      setError(error.message)
      setIsPending(false)
    }
  }

  return { error, isPending, signup }
}
