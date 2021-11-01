import { useReducer, useEffect, useState } from 'react'
import { db, timestamp } from '../firebase/config'

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }

    case 'ADDED_DOCUMENT':
      return {
        payload: action.payload,
        isPending: false,
        success: true,
        error: null,
      }

    case 'DELETED_DOCUMENT':
      return {
        document: null,
        isPending: false,
        success: true,
        error: action.payload,
      }

    case 'ERROR':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // only dispacth if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // collection ref
  const ref = db.collection(collection)
  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
    }
  }
  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({
        type: 'DELETED_DOCUMENT',
      })
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: "Couldn't delete" })
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}
