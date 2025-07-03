const fp = require('fastify-plugin');
const { PrismaClient } = require('../generated/prisma');

async function prismaPlugin(fastify, options) {
  const prisma = new PrismaClient();

  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async (instance) => {
    await instance.prisma.$disconnect();
  });
}

module.exports = fp(prismaPlugin);
