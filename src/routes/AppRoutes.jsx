import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import AdminRoutes from './AdminRoutes'
import UserRoutes from './UserRoutes'

// Rutas publicas (login/registro) + rutas protegidas segun el rol del usuario
export default function AppRoutes() {
  const { user } = useAuth()
  const home = user?.role === 'admin' ? '/admin' : '/app'

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" render={() => (user ? <Redirect to={home} /> : <Login />)} />
        <Route exact path="/register" render={() => (user ? <Redirect to={home} /> : <Register />)} />
        <Route path="/app" render={() => (user ? <UserRoutes /> : <Redirect to="/login" />)} />
        <Route
          path="/admin"
          render={() => (!user ? <Redirect to="/login" /> : user.role === 'admin' ? <AdminRoutes /> : <Redirect to="/app" />)}
        />
        <Route exact path="/" render={() => <Redirect to={user ? home : '/login'} />} />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}
