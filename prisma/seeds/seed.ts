import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.challenge.deleteMany();
  await prisma.room.deleteMany();

  //  -- AMBIENTE DE DE DESENVOLVIMENTO Reseta o contador de IDs (sequências) no PostgreSQL -- AMBIENTE DE DE DESENVOLVIMENTO
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Room_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Challenge_id_seq" RESTART WITH 1`,
  );

  // Dados das salas
  const rooms = [
    {
      name: 'Sala do Código',
      description: 'Decifre o código para avançar',
      completed: false,
      challenge: {
        create: {
          type: 'code',
          question: 'Qual é o resultado de 2 + 2 * 2?',
          answer: '6',
        },
      },
    },
    {
      name: 'Sala do Enigma',
      description: 'Resolva o enigma para continuar',
      completed: false,
      challenge: {
        create: {
          type: 'riddle',
          question: 'Quanto mais você tira, maior eu fico. O que sou?',
          answer: 'buraco',
        },
      },
    },
    {
      name: 'Sala Final',
      description: 'Último desafio para escapar',
      completed: false,
      challenge: {
        create: {
          type: 'pattern',
          question: 'Qual é o próximo número na sequência: 2, 4, 8, 16, ___?',
          answer: '32',
        },
      },
    },
  ];

  // Cria as salas e desafios
  for (const room of rooms) {
    await prisma.room.create({ data: room });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
