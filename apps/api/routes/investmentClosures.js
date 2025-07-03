async function investmentClosureRoutes(fastify, options) {
  // Create a new investment closure
  fastify.post('/investment-closures', async (request, reply) => {
    const { userId, investmentId, profit, notes, reinvestedTo } = request.body;
    try {
      const investmentClosure = await fastify.prisma.investmentClosure.create({
        data: {
          userId,
          investmentId,
          profit,
          notes,
          reinvestedTo,
        },
      });
      return investmentClosure;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error creating investment closure');
    }
  });

  // Get all investment closures
  fastify.get('/investment-closures', async (request, reply) => {
    try {
      const investmentClosures = await fastify.prisma.investmentClosure.findMany();
      return investmentClosures;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error fetching investment closures');
    }
  });

  // Get a single investment closure by id
  fastify.get('/investment-closures/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const investmentClosure = await fastify.prisma.investmentClosure.findUnique({
        where: { id },
      });
      if (!investmentClosure) {
        reply.code(404).send('Investment closure not found');
      }
      return investmentClosure;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error fetching investment closure');
    }
  });

  // Update an investment closure
  fastify.put('/investment-closures/:id', async (request, reply) => {
    const { id } = request.params;
    const { userId, investmentId, profit, notes, reinvestedTo } = request.body;
    try {
      const investmentClosure = await fastify.prisma.investmentClosure.update({
        where: { id },
        data: {
          userId,
          investmentId,
          profit,
          notes,
          reinvestedTo,
        },
      });
      return investmentClosure;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error updating investment closure');
    }
  });

  // Delete an investment closure
  fastify.delete('/investment-closures/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      await fastify.prisma.investmentClosure.delete({
        where: { id },
      });
      reply.code(204).send();
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error deleting investment closure');
    }
  });
}

module.exports = investmentClosureRoutes;
