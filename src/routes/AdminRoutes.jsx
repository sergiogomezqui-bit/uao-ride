import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { car, people, speedometer } from 'ionicons/icons'
import { Redirect, Route } from 'react-router-dom'
import Menu from '../components/Shared/Menu'
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard'
import AdminTrips from '../pages/AdminTrips/AdminTrips'
import AdminUsers from '../pages/AdminUsers/AdminUsers'

const menuItems = [
  { label: 'Resumen', path: '/admin/dashboard', icon: speedometer },
  { label: 'Usuarios', path: '/admin/users', icon: people },
  { label: 'Viajes', path: '/admin/trips', icon: car },
]

export default function AdminRoutes() {
  return (
    <>
      <Menu contentId="admin-main" items={[...menuItems, { label: 'Ir a la app', path: '/app/home', icon: car }]} />
      <IonTabs>
        <IonRouterOutlet id="admin-main">
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/users" component={AdminUsers} />
          <Route exact path="/admin/trips" component={AdminTrips} />
          <Route exact path="/admin" render={() => <Redirect to="/admin/dashboard" />} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          {menuItems.map((item) => (
            <IonTabButton key={item.path} tab={item.label} href={item.path}>
              <IonIcon icon={item.icon} />
              <IonLabel>{item.label}</IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
    </>
  )
}
