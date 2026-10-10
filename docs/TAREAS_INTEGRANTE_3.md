# Tareas — Integrante 3 (@AndruRz)

**Rama:** `feature/chat-admin` · **Tema:** chat en tiempo real, panel de administrador y seguridad de Firestore.

```bash
git clone https://github.com/sergiogomezqui-bit/uao-ride.git && cd uao-ride
git checkout feature/chat-admin
npm install        # y configurar .env (ver README)
```

Haz commits pequeños y frecuentes con **tu** usuario de git: el aporte se califica por rama. Al terminar abre un Pull Request hacia `main`.

## Qué ya existe (no tocar)
`AuthContext` (`useAuth()` → `user.uid`, `user.name`, `user.role`), `Menu`, `routes/` (`AdminRoutes` ya protege por rol), `firebase.js` (`db`), `helpers/index.js` (`formatTime`, `formatDate`).

Las rutas ya apuntan a tus páginas, hoy son placeholders que debes reemplazar:

| Ruta | Archivo |
|---|---|
| `/app/chat/:id` | `src/pages/Chat/Chat.jsx` |
| `/admin/dashboard` | `src/pages/AdminDashboard/AdminDashboard.jsx` |
| `/admin/users` | `src/pages/AdminUsers/AdminUsers.jsx` |
| `/admin/trips` | `src/pages/AdminTrips/AdminTrips.jsx` |

## Archivos a crear
Cada página con su `.module.scss` (estructura exigida por la rúbrica).

- `src/hooks/useChat.js` — `useChat(tripId, user)` → `{ messages, send }`. Suscripción `onSnapshot` a `trips/{tripId}/messages` ordenada por `createdAt`; `send` hace `addDoc` con `serverTimestamp()`. Tip: `d.data({ serverTimestamps: 'estimate' })` evita `null` en el mensaje recién enviado.
- `src/hooks/useCollection.js` — escucha en tiempo real una colección completa (la usa el panel admin).
- `firestore.rules` — ya existe; completar las reglas de viajes y chat (ver abajo).

## Modelo de datos
```
users/{uid}                   { name, email, role:'user'|'admin', photo, createdAt }
trips/{tripId}                { driverId, driverName, origin{label}, destination{label}, departureAt,
                                seats, seatsLeft, passengers[{uid,name}], participantIds[], status, ... }
trips/{tripId}/messages/{id}  { uid, name, text, createdAt }
```

## Checklist
- [ ] **Chat:** burbujas (propias a la derecha en rojo, ajenas a la izquierda con el nombre), hora, auto-scroll al último mensaje, enviar con botón y Enter, mensaje vacío no se envía.
- [ ] **AdminDashboard:** tarjetas con usuarios, admins, viajes abiertos, finalizados y reservas totales.
- [ ] **AdminUsers:** lista de usuarios con badge de rol y botón "Hacer admin / Quitar admin" (no sobre uno mismo).
- [ ] **AdminTrips:** lista de todos los viajes con badge de estado y botón eliminar con `IonAlert` de confirmación.
- [ ] **`firestore.rules`** (ya existe con las reglas de `users`/roles de Sergio; **no las modifiques**). Reemplaza solo el bloque provisional de `trips` y `messages` por reglas definitivas:
  - `trips`: lectura a autenticados; crear solo si `driverId == auth.uid`; los pasajeros solo pueden cambiar `seatsLeft`, `passengers` y `participantIds`, y el conductor el resto; borrar solo admin o el conductor.
  - `trips/{id}/messages`: leer y crear **solo si `auth.uid in participantIds`** del viaje (usar `get()`), y `uid` del mensaje igual a `auth.uid`.
  - Publicarlas con `firebase deploy --only firestore:rules` (o pegarlas en Firebase Console → Firestore → Reglas).
- [ ] Que se vea igual al prototipo de Lovable.

## Lo que se evalúa de tu parte
Comunicación en tiempo real, Firebase/BD, roles y seguridad, estructura de carpetas.
