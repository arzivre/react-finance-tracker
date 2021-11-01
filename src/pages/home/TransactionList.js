import { useFirestore } from '../../hooks/useFirestore'
import styles from './Home.module.css'

export default function TransactionList({ documents }) {
  const { transactions, name, amount } = styles
  const { deleteDocument, response } = useFirestore('transactions')
  console.log(response)
  return (
    <ul className={transactions}>
      {documents.map((data) => (
        <li key={data.id}>
          <p className={name}>{data.name}</p>
          <p className={amount}>Rp {data.amount}</p>
          <button onClick={() => deleteDocument(data.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}
