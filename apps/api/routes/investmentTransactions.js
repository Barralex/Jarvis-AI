async function investmentTransactionRoutes(fastify, options) {
  // Create a new investment transaction
  fastify.post('/investment-transactions', async (request, reply) => {
    const { userId, investmentId, assetId, direction, amount, pricePerUnit, currency, relatedHoldingId } = request.body;
    try {
      const investmentTransaction = await fastify.prisma.investmentTransaction.create({
        data: {
          userId,
          investmentId,
          assetId,
          direction,
          amount,
          pricePerUnit,
          currency,
          relatedHoldingId,
        },
      });
      return investmentTransaction;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error creating investment transaction');
    }
  });

  // Get all investment transactions
  fastify.get('/investment-transactions', async (request, reply) => {
    try {
      const investmentTransactions = await fastify.prisma.investmentTransaction.findMany();
      return investmentTransactions;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error fetching investment transactions');
    }
  });

  // Get a single investment transaction by id
  fastify.get('/investment-transactions/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const investmentTransaction = await fastify.prisma.investmentTransaction.findUnique({
        where: { id },
      });
      if (!investmentTransaction) {
        reply.code(404).send('Investment transaction not found');
      }
      return investmentTransaction;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error fetching investment transaction');
    }
  });

  // Update an investment transaction
  fastify.put('/investment-transactions/:id', async (request, reply) => {
    const { id } = request.params;
    const { userId, investmentId, assetId, direction, amount, pricePerUnit, currency, relatedHoldingId } = request.body;
    try {
      const investmentTransaction = await fastify.prisma.investmentTransaction.update({
        where: { id },
        data: {
          userId,
          investmentId,
          assetId,
          direction,
          amount,
          pricePerUnit,
          currency,
          relatedHoldingId,
        },
      });
      return investmentTransaction;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error updating investment transaction');
    }
  });

  // Delete an investment transaction
  fastify.delete('/investment-transactions/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      await fastify.prisma.investmentTransaction.delete({
        where: { id },
      });
      reply.code(204).send();
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error deleting investment transaction');
    }
  });
}

module.exports = investmentTransactionRoutes;
