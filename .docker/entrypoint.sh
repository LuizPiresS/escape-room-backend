#!/bin/bash

# Aguarda o banco de dados ficar disponível
until nc -z db 5432; do
  echo "Aguardando o banco de dados iniciar..."
  sleep 2
done

npm install
npm run build

npx prisma migrate deploy
npx prisma db seed

npm run start:debug