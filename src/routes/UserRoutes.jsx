import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { car, list, person } from 'ionicons/icons'
import { Redirect, Route } from 'react-router-dom'
import Menu from '../components/Shared/Menu'
import Chat from '../pages/Chat/Chat'
import Home from '../pages/Home/Home'
import MyTrips from '../pages/MyTrips/MyTrips'
import Profile from '../pages/Profile/Profile'
import TripCreate from '../pages/TripCreate/TripCreate'
import TripDetail from '../pages/TripDetail/TripDetail'

const menuItems = [
  { label: 'Viajes', path: '/app/home', icon: car },
  { label: 'Mis viajes', path: '/app/mytrips', icon: list },
  { label: 'Mi perfil', path: '/app/profile', icon: person },
]

export default function UserRoutes() {
  return (
    <>
      <Menu contentId="user-main" items={menuItems} />
      <IonTabs>
        <IonRouterOutlet id="user-main">
          <Route exact path="/app/home" component={Home} />
          <Route exact path="/app/mytrips" component={MyTrips} />
          <Route exact path="/app/profile" component={Profile} />
          <Route exact path="/app/trips/new" component={TripCreate} />
          <Route exact path="/app/trips/:id" component={TripDetail} />
          <Route exact path="/app/chat/:id" component={Chat} />
          <Route exact path="/app" render={() => <Redirect to="/app/home" />} />
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
