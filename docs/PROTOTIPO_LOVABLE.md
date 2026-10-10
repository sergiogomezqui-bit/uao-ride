# Prompt para el prototipo en Lovable

Pega este prompt en [lovable.dev](https://lovable.dev). Genera solo el prototipo visual (datos de ejemplo); la lógica real vive en este repositorio con Firebase. Cuando esté listo, copia el enlace del prototipo al `README.md`.

La app Ionic debe replicar fielmente su aspecto, así que **no cambien colores ni pantallas después** sin actualizar la app.

---

```
Crea el prototipo móvil (formato 390x844, mobile-first) de "UAO Ride", una app de
carpooling para estudiantes de la Universidad Autónoma de Occidente en Cali.
Usa datos de ejemplo, sin backend.

Estilo: color primario rojo #d71920, fondo blanco/gris claro, tarjetas con bordes
redondeados de 16px y sombra suave, tipografía Inter, barra superior roja con
título blanco, modo oscuro opcional.

Pantallas:
1. Login: cabecera roja con degradado, icono de carro, título "UAO Ride",
   campos correo y contraseña, botón "Iniciar sesión", enlace "Regístrate".
2. Registro: nombre, correo, contraseña, confirmar contraseña, botón "Registrarme".
3. Viajes disponibles (inicio): barra de búsqueda en la cabecera, lista de tarjetas
   con origen -> destino (puntos verde y rojo unidos por una línea), precio en rojo,
   conductor, hora y badge de cupos ("3 cupos", "Lleno"). Botón flotante "+".
   Barra inferior con 3 pestañas: Viajes, Mis viajes, Mi perfil. Botón hamburguesa
   que abre menú lateral con foto, nombre, enlaces, switch de modo oscuro y
   "Cerrar sesión".
4. Publicar viaje: selector Origen/Destino, mapa (campus UAO) para tocar y poner
   marcadores, botón "Usar mi ubicación", resumen, campos fecha/hora, cupos y precio,
   botón "Publicar viaje".
5. Detalle del viaje: mapa con ruta punteada, marcador verde (salida), rojo (llegada)
   y azul (conductor en vivo); datos del viaje; chips con pasajeros; botones
   "Reservar cupo", "Chat del viaje"; para el conductor, switch "Compartir mi
   ubicación en vivo" y botón "Finalizar viaje".
6. Chat del viaje: burbujas (propias en rojo a la derecha, ajenas en gris a la
   izquierda con el nombre), hora, campo de texto y botón enviar.
7. Mis viajes: lista de tarjetas de viajes en los que participa.
8. Perfil: avatar grande con botón "Cambiar foto", campos nombre, correo, rol, botón
   "Guardar cambios".
9. Panel de administración (cabecera oscura): tarjetas de estadísticas (usuarios,
   admins, viajes abiertos, finalizados, reservas); pestañas Resumen, Usuarios
   (con botón "Hacer admin") y Viajes (con botón eliminar).
```
