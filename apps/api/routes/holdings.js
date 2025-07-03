async function holdingRoutes(fastify, options) {
  // Create a new holding
  fastify.post('/holdings', async (request, reply) => {
    const { userId, assetId, source, amount } = request.body;
    try {
      const holding = await fastify.prisma.holding.create({
        data: {
          userId,
          assetId,
          source,
          amount,
        },
      });
      return holding;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error creating holding');
    }
  });

  // Get all holdings
  fastify.get('/holdings', async (request, reply) => {
    try {
      const holdings = await fastify.prisma.holding.findMany();
      return holdings;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error fetching holdings');
    }
  });

  // Get a single holding by id
  fastify.get('/holdings/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const holding = await fastify.prisma.holding.findUnique({
        where: { id },
      });
      if (!holding) {
        reply.code(404).send('Holding not found');
      }
      return holding;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error fetching holding');
    }
  });

  // Update a holding
  fastify.put('/holdings/:id', async (request, reply) => {
    const { id } = request.params;
    const { userId, assetId, source, amount } = request.body;
    try {
      const holding = await fastify.prisma.holding.update({
        where: { id },
        data: {
          userId,
          assetId,
          source,
          amount,
        },
      });
      return holding;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error updating holding');
    }
  });

  // Delete a holding
  fastify.delete('/holdings/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      await fastify.prisma.holding.delete({
        where: { id },
      });
      reply.code(204).send();
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error deleting holding');
    }
  });
}

module.exports = holdingRoutes;
