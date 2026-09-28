# Alterações — Perfil persistente + Backend TypeScript

## Frontend

### `src/services/profileService.js`
Novo serviço para comunicar com a API. Obtém o Firebase ID token e envia-o no header `Authorization`.

### `EditProfileModal.jsx`
Agora:

- usa inputs controlados com `useState`;
- carrega display name, username e bio atuais;
- permite escolher uma foto com `<input type="file">`;
- mostra preview da nova foto;
- limita imagens a 5 MB;
- chama o backend ao clicar em `Save Changes`;
- mostra erros como username já utilizado;
- sincroniza `displayName` e `photoURL` também com o perfil Firebase.

### `Profile.jsx`
Agora:

- depois do login chama `GET /api/profile`;
- mostra `profile.username` em vez de inventar sempre o username a partir do display name;
- mostra a bio guardada;
- mostra a foto guardada;
- atualiza o ecrã imediatamente após guardar alterações.

## Backend

### TypeScript + Express
Servidor na porta 3000.

### Firebase Authentication
O frontend envia o Firebase ID token e `requireAuth` valida-o antes de permitir acesso ao perfil.

### Prisma + SQLite
A base de dados local fica em `backend/prisma/dev.db` depois de executares `npm run db:push`.

### Upload da foto
`POST /api/profile/photo` recebe `multipart/form-data`, valida o tipo e tamanho da imagem, guarda-a em `backend/uploads/` e grava o URL no perfil.

## Fluxo completo

```text
Firebase Login
      │
      ▼
React obtém ID token
      │
      ▼
TypeScript / Express API
      │
      ├── valida token Firebase
      │
      ├── guarda username/displayName/bio no SQLite
      │
      └── guarda foto em backend/uploads
      │
      ▼
React recebe perfil atualizado
```
