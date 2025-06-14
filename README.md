# Escape Room Backend

Este projeto é uma API backend para um jogo de Escape Room, desenvolvida com [NestJS](https://nestjs.com/), [Prisma ORM](https://www.prisma.io/) e [PostgreSQL](https://www.postgresql.org/).

## Funcionalidades

- Gerenciamento de salas e desafios do Escape Room
- Validação de respostas dos desafios
- Controle de progresso do jogo
- Reset do estado do jogo
- Persistência dos dados em banco de dados relacional

## Tecnologias

- Node.js
- NestJS
- Prisma ORM
- PostgreSQL
- Docker

## Como rodar localmente

### Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- (Opcional) [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) para rodar fora do Docker

### Subindo com Docker Compose

```sh
docker compose up --build
```

A API estará disponível em `http://localhost:3000`.

### Rodando localmente (sem Docker)

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Configure o arquivo `.env` com sua conexão PostgreSQL:
   ```
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/escape_room"
   ```
3. Rode as migrações e o seed:
   ```sh
   npx prisma migrate deploy
   npx prisma db seed
   ```
4. Inicie a aplicação:
   ```sh
   npm run start:dev
   ```

## Endpoints principais

- `GET /game/room/:id` — Busca informações de uma sala
- `POST /game/room/:id/check-answer` — Verifica a resposta de um desafio
- `GET /game/progress` — Retorna o progresso do jogo
- `POST /game/reset` — Reseta o progresso do jogo

## Estrutura do Projeto

```
src/
  modules/
    game/
      application/
      domain/
      infrastructure/
      presentation/
  core/
    prisma/
prisma/
  schema.prisma
  seed.ts
```

## Scripts úteis

- `npm run start:dev` — Inicia o servidor em modo desenvolvimento
- `npm run build` — Compila o projeto
- `npx prisma migrate deploy` — Aplica as migrações no banco
- `npx prisma db seed` — Popula o banco com dados iniciais

## Licença

Este projeto é privado e não possui licença
