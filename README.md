# 🎬 Flicksy

**Flicksy** é uma aplicação de descoberta, classificação e review de filmes.

O objetivo do projeto é também servir como projeto de aprendizagem: começar por uma aplicação React simples e ir adicionando funcionalidades por fases, percebendo bem cada tecnologia antes de avançar para a seguinte.

O site é a primeira plataforma a ser desenvolvida. No futuro, o objetivo é criar também uma aplicação mobile usando o mesmo backend.

---

## 🎯 Objetivo da aplicação

No futuro, o Flicksy deverá permitir:

- Pesquisar filmes
- Consultar detalhes de filmes
- Classificar filmes
- Escrever reviews
- Criar uma watchlist
- Guardar favoritos
- Ter um perfil de utilizador
- Consultar histórico de ratings e reviews
- Ver reviews de outros utilizadores
- Descobrir filmes populares e tendências

Mais tarde, poderão também existir funcionalidades sociais e recomendações personalizadas.

---

# 🧱 Arquitetura pensada para o futuro

```text
Flicksy
│
├── frontend/
│   └── React + Vite
│
├── backend/
│   └── API do Flicksy
│
└── mobile/                 # futuro
    └── React Native
```

A ideia é que o site e a aplicação mobile utilizem o mesmo backend.

```text
          React Web
              │
              ▼
        Flicksy Backend
              │
              ▼
          Database
              ▲
              │
        React Native
```

---

# 🚀 Estado atual — Versão 0.2

Nesta versão já existem:

- Projeto React criado com Vite
- Página inicial `Home`
- `Navbar`
- `Footer`
- `MovieCard`
- `MovieGrid`
- Quatro filmes de exemplo guardados num array
- Renderização de vários filmes com `.map()`
- Passagem de dados entre componentes através de `props`
- CSS separado por componente
- Estrutura preparada para novas páginas e serviços
- Pasta de backend preparada para desenvolvimento futuro

Ainda **não existe API, backend, login ou base de dados**. Os filmes são dados locais usados para aprender os conceitos fundamentais de React.

---

# 📁 Estrutura atual

```text
Flicksy/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── styles/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Navbar.css
│   │   │   │
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Footer.css
│   │   │   │
│   │   │   ├── MovieCard/
│   │   │   │   ├── MovieCard.jsx
│   │   │   │   └── MovieCard.css
│   │   │   │
│   │   │   └── MovieGrid/
│   │   │       ├── MovieGrid.jsx
│   │   │       └── MovieGrid.css
│   │   │
│   │   ├── pages/
│   │   │   └── Home/
│   │   │       ├── Home.jsx
│   │   │       └── Home.css
│   │   │
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── utils/
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   └── README.md
│
├── .gitignore
└── README.md
```

---

# 🧩 Componentes atuais

## `Navbar`

Barra de navegação da aplicação.

Atualmente contém:

- Logo/nome Flicksy
- Home
- Movies
- Search

Os links ainda não utilizam React Router. Isso será adicionado numa fase futura.

---

## `Footer`

Rodapé simples e reutilizável da aplicação.

Atualmente apresenta:

```text
Flicksy © 2026
```

---

## `MovieCard`

Representa visualmente um filme.

Recebe informação através de **props**:

```jsx
<MovieCard
  title="Interstellar"
  year={2014}
  rating={8.7}
/>
```

O componente recebe:

```javascript
function MovieCard({ title, year, rating })
```

Assim podemos reutilizar o mesmo componente para filmes diferentes sem copiar o HTML/JSX.

---

## `MovieGrid`

Recebe um array de filmes e cria um `MovieCard` para cada um.

```jsx
<MovieGrid movies={movies} />
```

Internamente utiliza:

```javascript
movies.map(...)
```

Isto permite transformar:

```javascript
[
  { id: 1, title: 'Interstellar' },
  { id: 2, title: 'Inception' }
]
```

em vários componentes React.

Fluxo:

```text
movies
   │
   ▼
MovieGrid
   │
   ├── MovieCard
   ├── MovieCard
   ├── MovieCard
   └── MovieCard
```

---

# 🏠 Página `Home`

A `Home` junta os vários componentes atuais.

```text
Home
│
├── Navbar
│
├── Hero
│   ├── Flicksy
│   └── Discover, rate and review movies.
│
├── Popular Movies
│   └── MovieGrid
│       ├── MovieCard
│       ├── MovieCard
│       ├── MovieCard
│       └── MovieCard
│
└── Footer
```

Por enquanto os filmes estão definidos diretamente em `Home.jsx`:

```javascript
const movies = [
  {
    id: 1,
    title: 'Interstellar',
    year: 2014,
    rating: 8.7,
  },
  // ...
];
```

Mais tarde estes dados deixarão de estar escritos manualmente e serão obtidos através de uma API.

---

# 📂 Pastas preparadas para o futuro

## `services/`

Será responsável pela comunicação com APIs.

Exemplo futuro:

```text
services/
├── movieService.js
├── reviewService.js
├── userService.js
└── authService.js
```

---

## `hooks/`

Será utilizado para custom React Hooks.

Exemplo:

```text
hooks/
├── useMovies.js
└── useAuth.js
```

---

## `context/`

Será usado para informação global partilhada por várias partes da aplicação.

Exemplo futuro:

```text
context/
└── AuthContext.jsx
```

---

## `utils/`

Funções auxiliares reutilizáveis.

Exemplos:

```javascript
formatDate();
formatRating();
```

---

# ⚛️ Conceitos React aprendidos nesta versão

## Componentes

A interface deixa de ser construída toda num único ficheiro e passa a ser dividida em peças reutilizáveis.

```text
App
 ↓
Home
 ├── Navbar
 ├── MovieGrid
 │    └── MovieCard
 └── Footer
```

## Props

Permitem passar informação de um componente para outro.

```jsx
<MovieCard title="Interstellar" year={2014} rating={8.7} />
```

## Arrays

Os filmes são guardados num array de objetos JavaScript.

## `.map()`

Permite percorrer o array e criar automaticamente um componente para cada filme.

---

# 🛠️ Tecnologias atuais

- React
- JavaScript
- HTML
- CSS
- Vite

Tecnologias previstas para fases futuras:

- React Router
- API TMDB
- Supabase ou outro serviço de autenticação/base de dados
- Google Login
- Backend próprio, se necessário
- PostgreSQL
- React Native

---

# ▶️ Executar o projeto

Entrar na pasta do frontend:

```bash
cd frontend
```

Instalar dependências:

```bash
npm install
```

Executar em modo de desenvolvimento:

```bash
npm run dev
```

O Vite deverá apresentar algo semelhante a:

```text
Local: http://localhost:5173/
```

Abrir no browser:

```text
http://localhost:5173
```

---

# 🧭 Plano de aprendizagem e desenvolvimento

```text
1. ✅ React + página Flicksy
        ↓
2. ✅ Componentes básicos
        ↓
3.    State + useState
        ↓
4.    SearchBar e filtragem local
        ↓
5.    React Router + várias páginas
        ↓
6.    Ligação à API TMDB
        ↓
7.    Posters e informação real dos filmes
        ↓
8.    Página individual do filme
        ↓
9.    Autenticação
        ↓
10.   Google Login
        ↓
11.   Base de dados
        ↓
12.   Ratings
        ↓
13.   Reviews
        ↓
14.   Watchlist
        ↓
15.   Deploy
        ↓
16.   Aplicação mobile com React Native
```

---

# 📌 Próxima fase recomendada

A próxima evolução pode ser criar um `SearchBar` e utilizar `useState`.

Exemplo do objetivo:

```text
[ inter____________ ]

Interstellar
```

Ao escrever no campo de pesquisa, os filmes mostrados pelo `MovieGrid` serão filtrados.

Isto permitirá aprender:

- `useState`
- Eventos (`onChange`)
- Inputs controlados
- Filtragem de arrays
- Atualização automática da interface React

---

# 🎬 Dados de filmes no futuro

Para informação como:

- Título
- Poster
- Data de lançamento
- Género
- Atores
- Diretor
- Descrição

poderá ser utilizada uma API como a **TMDB**.

A base de dados do Flicksy deverá guardar principalmente os dados específicos da plataforma:

```text
Users
Reviews
Ratings
Watchlists
Favorites
```

---

# 🌿 Git

Como o projeto será desenvolvido por duas pessoas, é recomendável trabalhar com branches.

Exemplo:

```text
main
│
└── develop
     │
     ├── feature/movie-card
     ├── feature/search
     ├── feature/router
     └── feature/reviews
```

Criar uma branch:

```bash
git checkout -b feature/movie-card
```

Guardar as alterações:

```bash
git add .
git commit -m "feat: add movie card and movie grid"
git push origin feature/movie-card
```

---

# 📏 Convenções

## Componentes React

PascalCase:

```text
MovieCard.jsx
ReviewCard.jsx
SearchBar.jsx
```

## Funções e variáveis

camelCase:

```javascript
getMovie();
searchMovies();
currentUser;
movieRating;
```

## Commits

Exemplos:

```text
feat: add movie card
feat: add movie grid
feat: add footer
fix: correct navbar spacing
docs: update README
```
