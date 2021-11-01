import { useEffect, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionForm({ uid }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const { addDocument, response } = useFirestore('transactions')

  const handleSubmit = (e) => {
    e.preventDefault()
    addDocument({
      amount,
      name,
      uid,
    })
  }

  // reset form fields
  useEffect(() => {
    if (response.success) {
      setName('')
      setAmount('')
    }
  }, [response.success])

  return (
    <>
      <h3>Transcation</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor=''>
          <span>Transcation Name</span>
          <input
            type='text'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor=''>
          <span>Amount</span>
          <input
            type='number'
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button>Add Transcation</button>
      </form>
    </>
  )
}
