# Escape Room Backend

Este projeto é uma API backend para um jogo de Escape Room, desenvolvida com [NestJS](https://nestjs.com/), [Prisma ORM](https://www.prisma.io/) e [PostgreSQL](https://www.postgresql.org/).

## Resumo

API backend para um jogo de Escape Room, com controle de salas, desafios, progresso e validação de respostas. O acesso às salas é sequencial e os dados são persistidos em PostgreSQL via Prisma ORM. O projeto segue boas práticas de arquitetura, separando domínio, aplicação, infraestrutura e apresentação.

## Decisões de Arquitetura e Motivações

- **NestJS:**  
  Escolhido por ser um framework Node.js robusto, modular e com suporte nativo a injeção de dependências, facilitando a organização do código e a aplicação de princípios SOLID.

- **Prisma ORM:**  
  Utilizado para facilitar o acesso e manipulação de dados no PostgreSQL, com tipagem forte, geração automática de tipos e migrações seguras.

- **PostgreSQL:**  
  Banco de dados relacional confiável, amplamente utilizado em produção, com suporte a transações e integridade referencial.

- **Separação em camadas (Domain, Application, Infrastructure, Presentation):**  
  Segue princípios de Clean Architecture e DDD, facilitando manutenção, testes, evolução do sistema e desacoplamento entre regras de negócio e detalhes de infraestrutura.

- **Injeção de dependências via interfaces:**  
  Permite fácil substituição de implementações (ex: mock em testes), promovendo baixo acoplamento e alta testabilidade.

- **Validação e DTOs:**  
  Uso de DTOs e validação automática garante integridade dos dados recebidos pela API e facilita manutenção.

- **Controle de acesso sequencial às salas:**  
  Garante a lógica do jogo, impedindo que jogadores pulem etapas e mantendo a experiência de desafio progressivo.

- **Docker:**  
  Facilita o setup do ambiente de desenvolvimento e produção, garantindo consistência e facilidade de deploy.

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

## Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- (Opcional) [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) para rodar fora do Docker

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com a variável:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/escape_room"
```

Ajuste `usuario`, `senha` e `escape_room` conforme seu ambiente.

## Como rodar com Docker Compose

```sh
docker compose up --build
```

A API estará disponível em `http://localhost:3000`.

## Como rodar localmente (sem Docker)

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Configure o arquivo `.env` conforme acima.
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

- `GET /game/room/:id` — Busca informações de uma sala (só acessa se salas anteriores estiverem completas)
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

- **Domain:** Interfaces dos serviços e repositórios.
- **Application:** Serviços de negócio (GameService).
- **Infrastructure:** Implementação dos repositórios usando Prisma.
- **Presentation:** Controllers HTTP e DTOs para comunicação com o frontend.
- **Core:** Módulo de conexão com o banco de dados via Prisma.

## Scripts úteis

- `npm run start:dev` — Inicia o servidor em modo desenvolvimento
- `npm run build` — Compila o projeto
- `npx prisma migrate deploy` — Aplica as migrações no banco
- `npx prisma db seed` — Popula o banco com dados iniciais

## Testes

Para rodar os testes automatizados:

```sh
npm run test
```

## Licença

Este projeto é privado e não possui licença aberta.
