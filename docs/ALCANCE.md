# Documento de alcance y tecnologías — UAO Ride

## 1. Problema

Muchos estudiantes de la UAO se desplazan solos en carro o gastan mucho en transporte. Falta una forma simple y segura de coordinar viajes compartidos entre miembros de la comunidad.

## 2. Objetivo

Una app móvil donde un conductor publique un viaje, los pasajeros reserven cupo, vean la ruta y la posición del conductor en tiempo real, y se coordinen por chat.

## 3. Alcance

### Incluido
- Registro e inicio de sesión reales (Firebase Authentication), sesión persistente.
- Roles **usuario** y **administrador** con rutas protegidas.
- Publicar viaje eligiendo origen y destino en un mapa (o con el GPS), fecha, cupos y precio.
- Listado de viajes en tiempo real con búsqueda.
- Reserva y cancelación de cupo mediante **transacción** (evita sobreventa).
- Seguimiento del conductor **en vivo** en el mapa.
- Chat en tiempo real por viaje (solo participantes).
- Perfil con foto tomada con la cámara.
- Modo oscuro persistente y funcionamiento con caché sin conexión.
- Panel admin: estadísticas, gestión de roles de usuarios, eliminación de viajes.

### Fuera de alcance
- Pagos en línea (el precio es informativo).
- Verificación de identidad / correo institucional.
- Notificaciones push.
- Cálculo automático de rutas y tarifas.

## 4. Roles

| Rol | Puede |
|---|---|
| Usuario | Publicar y reservar viajes, chatear, compartir ubicación, editar perfil |
| Administrador | Todo lo anterior + ver estadísticas, promover/quitar admins, eliminar viajes |

## 5. Modelo de datos (Firestore)

```
users/{uid}                { name, email, role, photo, createdAt }
trips/{tripId}             { driverId, driverName, origin{lat,lng,label}, destination{...},
                             departureAt, seats, seatsLeft, price, passengers[], participantIds[],
                             status, driverLocation{lat,lng,updatedAt}, createdAt }
trips/{tripId}/messages/{id}  { uid, name, text, createdAt }
```

## 6. Arquitectura y tecnologías

| Capa | Tecnología | Motivo |
|---|---|---|
| UI móvil | Ionic 8 + React 18 | Componentes nativos y un solo código para web/Android/iOS |
| Estilos | SCSS Modules | Estilos aislados por componente (exigido por la rúbrica) |
| Enrutamiento | React Router 5 + `IonReactRouter` | Navegación con pestañas y guardas por rol |
| Estado | Context API + hooks personalizados | Autenticación, tema y suscripciones a Firestore |
| Backend | Firebase Auth + Cloud Firestore | Login real, BD en tiempo real, sin servidor propio |
| Mapas | Leaflet + OpenStreetMap | Gratuito, sin API key |
| Geocodificación | Nominatim | Dirección legible a partir de coordenadas |
| Sensores | Capacitor Camera y Geolocation | Foto de perfil y GPS |
| Memoria | localStorage + caché persistente de Firestore | Tema y datos disponibles sin conexión |
| Build | Vite | Empaquetado rápido |
| Nativo | Capacitor | Generar APK / app iOS |

## 7. Correspondencia con la rúbrica

| Requisito | Dónde |
|---|---|
| Prototipo Lovable | [PROTOTIPO_LOVABLE.md](PROTOTIPO_LOVABLE.md) + enlace en README |
| Estructura Helpers/Context/Pages/Components/Hooks/Routes | `src/` |
| React, sensores, memoria, BD, Firebase, tiempo real | Ver README |
| Chat / mapas con BD en tiempo real | `Chat`, `TripDetail` (`onSnapshot`) |
| Login/registro reales y transacciones | `AuthContext`, `helpers/trips.js` (`runTransaction`) |
| Documento de alcance en Git | Este archivo |

## Aporte por integrante

| Rama | Integrante | Entregables |
|---|---|---|
| `feature/auth-perfil` | Sergio Gómez (@sergiogomezqui-bit) | `AuthContext`, `Login`, `Register`, `Profile`, `Menu`, rutas, documentación |
| `feature/viajes-mapa` | @julianviafara | `MapView`, `CardItem`, `Home`, `TripCreate`, `TripDetail`, `MyTrips`, hooks de viajes y GPS ([tareas](TAREAS_INTEGRANTE_2.md)) |
| `feature/chat-admin` | @AndreRz | `Chat`, `useChat`, páginas Admin, `firestore.rules` ([tareas](TAREAS_INTEGRANTE_3.md)) |

Las tres ramas deben integrarse en `main` con commits de merge.
