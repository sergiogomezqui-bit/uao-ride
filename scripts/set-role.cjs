// Asigna el rol de un usuario en Firestore (sirve para crear administradores).
//
//   node scripts/set-role.cjs correo@ejemplo.com admin
//   node scripts/set-role.cjs correo@ejemplo.com user
//
// Requisitos: haber hecho `firebase login` con una cuenta que tenga acceso al proyecto
// y tener instalado firebase-tools (`npm i -g firebase-tools`).
// El usuario debe haberse registrado antes en la app.
// Esto funciona porque usa credenciales de administrador del proyecto; las reglas de
// Firestore impiden que un usuario se asigne el rol por su cuenta desde la app.

const { execSync } = require('child_process')
const path = require('path')

const PROJECT = process.env.FIREBASE_PROJECT || 'desarrollo-movil-uao'
const [email, role] = process.argv.slice(2)

if (!email || !['admin', 'user'].includes(role)) {
  console.error('Uso: node scripts/set-role.cjs <correo> <admin|user>')
  process.exit(1)
}

const globalRoot = execSync('npm root -g').toString().trim()
const lib = path.join(globalRoot, 'firebase-tools', 'lib')
const auth = require(path.join(lib, 'auth'))
const { Client } = require(path.join(lib, 'apiv2'))

;(async () => {
  auth.setActiveAccount({}, auth.getGlobalDefaultAccount())
  const api = new Client({ urlPrefix: 'https://firestore.googleapis.com', apiVersion: 'v1', auth: true })
  const base = `/projects/${PROJECT}/databases/(default)/documents`

  const found = await api.post(`${base}:runQuery`, {
    structuredQuery: {
      from: [{ collectionId: 'users' }],
      where: { fieldFilter: { field: { fieldPath: 'email' }, op: 'EQUAL', value: { stringValue: email } } },
    },
  })
  const doc = found.body.find((r) => r.document)?.document
  if (!doc) {
    console.error(`No existe un usuario registrado con el correo ${email}. Debe registrarse primero en la app.`)
    process.exit(1)
  }

  await api.patch(`${doc.name.replace(/^projects\/[^/]+\/databases\/\(default\)\/documents/, base)}`, { fields: { role: { stringValue: role } } }, {
    queryParams: { 'updateMask.fieldPaths': 'role' },
  })
  console.log(`OK: ${email} ahora es "${role}"`)
})().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
