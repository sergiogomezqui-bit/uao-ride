# Tareas — Integrante 2 (@julianviafara)

**Rama:** `feature/viajes-mapa` · **Tema:** viajes, mapa, GPS, ubicación en vivo y reservas.

```bash
git clone https://github.com/sergiogomezqui-bit/uao-ride.git && cd uao-ride
git checkout feature/viajes-mapa
npm install        # y configurar .env (ver README)
```

Haz commits pequeños y frecuentes con **tu** usuario de git: el aporte se califica por rama. Al terminar abre un Pull Request hacia `main`.

## Qué ya existe (no tocar)
`AuthContext` (`useAuth()` → `user.uid`, `user.name`, `user.photo`, `user.role`), `Menu`, `routes/`, `firebase.js` (`db`), `helpers/index.js` (`formatDate`, `formatPrice`, `distanceKm`, `UAO_CENTER`), `useLocalStorage`.

Las rutas ya apuntan a tus páginas, hoy son placeholders que debes reemplazar:

| Ruta | Archivo |
|---|---|
| `/app/home` | `src/pages/Home/Home.jsx` |
| `/app/mytrips` | `src/pages/MyTrips/MyTrips.jsx` |
| `/app/trips/new` | `src/pages/TripCreate/TripCreate.jsx` |
| `/app/trips/:id` | `src/pages/TripDetail/TripDetail.jsx` |

## Archivos a crear
Cada página con su `.module.scss` (estructura exigida por la rúbrica).

- `src/components/Index/CardItem.jsx` + `.module.scss` — tarjeta de viaje (origen → destino, precio, conductor, hora, badge de cupos).
- `src/components/Shared/MapView.jsx` + `.module.scss` — mapa con **Leaflet/react-leaflet** (ya instalados): marcadores, línea de ruta, `onPick` para tocar el mapa. Tip: llamar `map.invalidateSize()` tras montar dentro de `IonContent`.
- `src/helpers/geocode.js` — `reverseGeocode({lat,lng})` con la API de Nominatim (`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=..&lon=..`).
- `src/helpers/trips.js` — `createTrip`, `joinTrip`, `leaveTrip`, `finishTrip`, `updateDriverLocation`.
- `src/hooks/useTrips.js` — `useTrips({status, participantId})` y `useTrip(id)` con `onSnapshot`.
- `src/hooks/useGeolocation.js` — GPS con `@capacitor/geolocation`.
- `src/hooks/useLiveLocation.js` — `watchPosition` que publica la posición del conductor (máx. 1 escritura cada 3 s).

## Modelo de datos (colección `trips`)
```
{ driverId, driverName, driverPhoto,
  origin:{lat,lng,label}, destination:{lat,lng,label},
  departureAt (ISO), seats, seatsLeft, price,
  passengers:[{uid,name}], participantIds:[uid...],   // participantIds incluye al conductor
  status:'open'|'finished',
  driverLocation:{lat,lng,updatedAt}, createdAt }
```

## Checklist
- [ ] **Home:** lista en tiempo real de viajes `open`, buscador por origen/destino/conductor, FAB "+" → `/app/trips/new`.
- [ ] **TripCreate:** elegir origen y destino tocando el mapa (+ botón "Usar mi ubicación"), fecha, cupos, precio; validar; guardar.
- [ ] **TripDetail:** mapa con ruta, datos, pasajeros; **Reservar cupo con `runTransaction`** (sin cupos negativos ni duplicados); cancelar cupo; botón "Chat del viaje" → `/app/chat/:id` (solo conductor/pasajeros); el conductor activa "compartir ubicación en vivo" y los pasajeros ven el marcador moverse; "Finalizar viaje".
- [ ] **MyTrips:** viajes donde `participantIds` contiene mi uid (`array-contains`).
- [ ] Que se vea igual al prototipo de Lovable.

## Lo que se evalúa de tu parte
Sensor (GPS), mapas, tiempo real (`onSnapshot`), transacción de datos, estructura de carpetas.
