# GameList

Aplicação web para pesquisar jogos, gerenciar uma lista de desejos (wishlist) e avaliar jogos, vendo também as avaliações de outros usuários.

Projeto final da disciplina de Programação Web (XDES03).

## Descrição do projeto

O GameList consegue encontrar informações sobre jogos, guardar os que você quer jogar depois, e saber a opinião de outras pessoas antes de decidir jogar algo.

A aplicação permite:

- **Pesquisar jogos** por nome, com filtro por gênero e paginação, usando dados reais da [RAWG Video Games Database](https://rawg.io/apidocs)
- **Ver detalhes de um jogo** — capa, nota, ano de lançamento, gêneros e descrição
- **Criar conta e fazer login**
- **Adicionar e remover jogos de uma lista de desejos** pessoal
- **Avaliar um jogo** (nota de 0 a 10 + comentário) e **ver as avaliações de outros usuários** para o mesmo jogo
- **Editar sua própria avaliação** a qualquer momento

### Tecnologias utilizadas

**Frontend**
- [Next.js](https://nextjs.org/) (App Router) com TypeScript
- [Zod](https://zod.dev/) para validação de formulários
- [Sonner](https://sonner.emilkowal.ski/) para notificações
- CSS puro para estilização

**Backend**
- [Node.js](https://nodejs.org/) com [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/) com banco de dados SQLite
- [JWT](https://jwt.io/) (`jsonwebtoken`) para autenticação, com token guardado em cookie `httpOnly`
- [bcrypt](https://www.npmjs.com/package/bcrypt) para hash de senha

**API externa**
- [RAWG Video Games Database](https://rawg.io/apidocs) — fonte dos dados de jogos (capa, nota, gênero, descrição)


## Screenshots

### Tela de login

![Tela de login](docs/screenshots/tela-login.jpg)

### Tela de cadastro

![Tela de cadastro](docs/screenshots/tela-cadastro.jpg)

### Explorar jogos (busca, filtro por gênero e paginação)

![Tela de explorar jogos](docs/screenshots/explorar-jogos.jpg)

### Busca filtrada por gênero

![Busca filtrada por gênero](docs/screenshots/busca-genero.jpg)

### Detalhe do jogo (descrição, wishlist e avaliações)

![Detalhe do jogo](docs/screenshots/detalhe-jogo.jpg)

### Minha wishlist

![Minha wishlist](docs/screenshots/wishlist.jpg)

### Minhas avaliações

![Minhas avaliações](docs/screenshots/reviews.jpg)

### Jogo não encontrado (tratamento de erro)

![Jogo não encontrado](docs/screenshots/jogo-notfound.jpg)

## Como rodar o projeto

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Crie um arquivo `.env` dentro de `backend/` com:
```
DATABASE_URL="file:./prisma/app.db"
JWT_SECRET="sua-string-secreta-aqui"
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Crie um arquivo `.env.local` dentro de `frontend/` com:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
RAWG_API_KEY=sua_chave_da_rawg_aqui
```

A chave da RAWG é gratuita e pode ser gerada em [rawg.io/apidocs](https://rawg.io/apidocs).

## Integrantes

| Nome | GitHub|
|---|---|
| Laura Jesus | [@LauraJesus](https://github.com/LauraJesus) |
| Bianca Salvador |  |
