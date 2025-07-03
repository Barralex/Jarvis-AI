async function investmentRoutes(fastify, options) {
  // Create a new investment
  fastify.post('/investments', async (request, reply) => {
    const { userId, name, description, investedAt, closedAt, status, metadata } = request.body;
    try {
      const investment = await fastify.prisma.investment.create({
        data: {
          userId,
          name,
          description,
          investedAt,
          closedAt,
          status,
          metadata,
        },
      });
      return investment;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error creating investment');
    }
  });

  // Get all investments
  fastify.get('/investments', async (request, reply) => {
    try {
      const investments = await fastify.prisma.investment.findMany();
      return investments;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error fetching investments');
    }
  });

  // Get a single investment by id
  fastify.get('/investments/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const investment = await fastify.prisma.investment.findUnique({
        where: { id },
      });
      if (!investment) {
        reply.code(404).send('Investment not found');
      }
      return investment;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error fetching investment');
    }
  });

  // Update an investment
  fastify.put('/investments/:id', async (request, reply) => {
    const { id } = request.params;
    const { userId, name, description, investedAt, closedAt, status, metadata } = request.body;
    try {
      const investment = await fastify.prisma.investment.update({
        where: { id },
        data: {
          userId,
          name,
          description,
          investedAt,
          closedAt,
          status,
          metadata,
        },
      });
      return investment;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error updating investment');
    }
  });

  // Delete an investment
  fastify.delete('/investments/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      await fastify.prisma.investment.delete({
        where: { id },
      });
      reply.code(204).send();
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error deleting investment');
    }
  });
}

module.exports = investmentRoutes;
