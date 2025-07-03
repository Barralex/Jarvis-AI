async function holdingMovementRoutes(fastify, options) {
  // Create a new holding movement
  fastify.post('/holding-movements', async (request, reply) => {
    const { userId, holdingId, direction, amount, reason, metadata } = request.body;
    try {
      const holdingMovement = await fastify.prisma.holdingMovement.create({
        data: {
          userId,
          holdingId,
          direction,
          amount,
          reason,
          metadata,
        },
      });
      return holdingMovement;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error creating holding movement');
    }
  });

  // Get all holding movements
  fastify.get('/holding-movements', async (request, reply) => {
    try {
      const holdingMovements = await fastify.prisma.holdingMovement.findMany();
      return holdingMovements;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error fetching holding movements');
    }
  });

  // Get a single holding movement by id
  fastify.get('/holding-movements/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const holdingMovement = await fastify.prisma.holdingMovement.findUnique({
        where: { id },
      });
      if (!holdingMovement) {
        reply.code(404).send('Holding movement not found');
      }
      return holdingMovement;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error fetching holding movement');
    }
  });

  // Update a holding movement
  fastify.put('/holding-movements/:id', async (request, reply) => {
    const { id } = request.params;
    const { userId, holdingId, direction, amount, reason, metadata } = request.body;
    try {
      const holdingMovement = await fastify.prisma.holdingMovement.update({
        where: { id },
        data: {
          userId,
          holdingId,
          direction,
          amount,
          reason,
          metadata,
        },
      });
      return holdingMovement;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error updating holding movement');
    }
  });

  // Delete a holding movement
  fastify.delete('/holding-movements/:id', async (request, reply) => {
    try {
      await fastify.prisma.holdingMovement.delete({
        where: { id },
      });
      reply.code(204).send();
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error deleting holding movement');
    }
  });
}

module.exports = holdingMovementRoutes;
