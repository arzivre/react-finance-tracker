import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/Signup'

import './App.css'
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
