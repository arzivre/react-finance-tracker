import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/Signup'

import { useAuthContext } from './hooks/useAuthContext'

import './App.css'
function App() {
  const { authIsReady, user } = useAuthContext()
  return (
    <div className='App'>
      {authIsReady ? (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path='/'>
              {user ? <Home /> : <Redirect to='/login' />}
            </Route>
            <Route path='/login'>
              {!user ? <Login /> : <Redirect to='/' />}
            </Route>
            <Route path='/signup'>
              {!user ? <SignUp /> : <Redirect to='/' />}
            </Route>
          </Switch>
        </BrowserRouter>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default App
