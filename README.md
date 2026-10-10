# UAO Ride 🚗

App móvil de **carpooling universitario**: estudiantes de la UAO publican viajes, otros reservan cupo, ven la ruta en un mapa, siguen al conductor en vivo y chatean con el grupo. Incluye un panel de administración.

> Entrega Proyecto Final — Desarrollo Móvil, Universidad Autónoma de Occidente.

## Integrantes

| Integrante | Rama | Responsabilidad | Estado |
|---|---|---|---|
| Sergio Gómez ([@sergiogomezqui-bit](https://github.com/sergiogomezqui-bit)) | `feature/auth-perfil` | Autenticación, registro, perfil con cámara, menú, rutas, documentación | ✅ Listo |
| [@julianviafara](https://github.com/julianviafara) | `feature/viajes-mapa` | Viajes, mapa, GPS, ubicación en vivo, reservas | ⏳ [Tareas](docs/TAREAS_INTEGRANTE_2.md) |
| [@AndreRz](https://github.com/AndreRz) | `feature/chat-admin` | Chat en tiempo real, panel admin, reglas de Firestore | ⏳ [Tareas](docs/TAREAS_INTEGRANTE_3.md) |

## Enlaces

- **Repositorio:** https://github.com/sergiogomezqui-bit/uao-ride
- **Prototipo (Lovable):** _pegar URL del prototipo_ (prompt usado en [docs/PROTOTIPO_LOVABLE.md](docs/PROTOTIPO_LOVABLE.md))
- **Documento de alcance y tecnologías:** [docs/ALCANCE.md](docs/ALCANCE.md)

## Tecnologías

Ionic 8 · React 18 · Vite · SCSS Modules · Firebase (Auth + Firestore) · Leaflet/OpenStreetMap · Capacitor (Cámara y Geolocalización).

## APIs de backend consumidas

| API | Uso |
|---|---|
| Firebase Authentication (`identitytoolkit`) | Registro, login y sesión persistente |
| Cloud Firestore (`users`) | Perfiles y roles (tiempo real) |
| Cloud Firestore (`trips`) | Viajes, cupos, reservas con **transacción**, ubicación del conductor en vivo |
| Cloud Firestore (`trips/{id}/messages`) | Chat en tiempo real |
| Nominatim – OpenStreetMap (`/reverse`) | Convertir coordenadas en direcciones |
| OpenStreetMap Tiles | Mapa base |

## Estructura de carpetas

```
src/
├── helpers/        index.js (funciones generales), trips.js, geocode.js
├── context/        AuthContext, ThemeContext
├── hooks/          useLocalStorage + (por integrantes) useTrips, useChat, useGeolocation, useLiveLocation, useCollection
├── routes/         AppRoutes, UserRoutes, AdminRoutes
├── pages/          <Pagina>/<Pagina>.jsx + <Pagina>.module.scss
└── components/
    ├── Index/      CardItem
    └── Shared/     Menu, MapView
```

## Temas del curso aplicados

React (hooks, context, rutas) · Ionic · Sensores (cámara y GPS) · Memoria (localStorage + caché persistente de Firestore) · Base de datos y Firebase · Comunicación en tiempo real (chat y ubicación en vivo con `onSnapshot`).

## Cómo ejecutarlo

1. **Crear proyecto en Firebase** ([console.firebase.google.com](https://console.firebase.google.com)):
   - *Authentication* → habilitar **Correo/Contraseña**.
   - *Firestore Database* → crear base de datos.
   - *Configuración del proyecto* → agregar una **app web** y copiar sus credenciales.
2. Copiar las credenciales:
   ```bash
   cp .env.example .env
   ```
   y completar los valores `VITE_FIREBASE_*`.
3. Publicar las reglas de seguridad (pegar el contenido de [firestore.rules](firestore.rules) en *Firestore → Reglas*, o con `firebase deploy --only firestore:rules`).
4. Instalar y correr:
   ```bash
   npm install
   npm run dev
   ```
5. **Crear un administrador:** registra un usuario y en Firestore → colección `users` cambia su campo `role` a `admin`.

### App nativa (Android/iOS)

```bash
npm run build
npx cap add android
npx cap sync
npx cap open android
```

## Flujo de trabajo Git

Cada integrante trabaja en su rama y se mezcla sobre `main` con `merge`. Ver [docs/ALCANCE.md](docs/ALCANCE.md#aporte-por-integrante).
