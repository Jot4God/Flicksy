# Flicksy Backend (TypeScript)

Primeira API real do Flicksy. Nesta versão o backend guarda os dados editáveis do perfil e recebe a foto de perfil.

## Stack

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite para desenvolvimento local
- Firebase Authentication para autenticação
- Multer para upload local de imagens

> SQLite foi escolhido nesta primeira versão porque não obriga a instalar PostgreSQL só para aprender o fluxo frontend → API → base de dados. O Prisma permite migrar para PostgreSQL mais tarde com poucas alterações.

## Dados guardados

A tabela `UserProfile` guarda:

- `firebaseUid`
- `email`
- `username`
- `displayName`
- `bio`
- `photoURL`
- datas de criação/alteração

O Firebase continua responsável pelo login. O backend valida o Firebase ID token recebido do frontend antes de ler ou alterar o perfil.

## Endpoints

```text
GET  /api/health
GET  /api/profile
PUT  /api/profile
POST /api/profile/photo
```

Os endpoints de perfil precisam do header:

```text
Authorization: Bearer <firebase-id-token>
```

## Arrancar o backend

```bash
cd backend
cp .env.example .env
npm install
npm run db:push
npm run dev
```

API:

```text
http://localhost:3000
```

Prisma Studio para veres os utilizadores/perfis guardados:

```bash
npm run db:studio
```

## Nota sobre Firebase Admin

Para validar Firebase ID tokens no backend, o Admin SDK precisa de credenciais de uma Service Account. Cria uma Service Account no Firebase/Google Cloud e define:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/caminho/service-account.json"
```

Nunca envies esse JSON para o GitHub.
