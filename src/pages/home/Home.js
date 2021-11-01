import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

import styles from './Home.module.css'

export default function Home() {
  const { content, container, sidebar } = styles
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'transactions',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  )
  return (
    <div className={container}>
      <div className={content}>
        {documents && <TransactionList documents={documents} />}
        {error && <p>{error}</p>}
      </div>
      <div className={sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  )
}
