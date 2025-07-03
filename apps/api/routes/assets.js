async function assetRoutes(fastify, options) {
  // Create a new asset
  fastify.post('/assets', async (request, reply) => {
    const { symbol, name, assetType } = request.body;
    try {
      const asset = await fastify.prisma.asset.create({
        data: {
          symbol,
          name,
          assetType,
        },
      });
      return asset;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error creating asset');
    }
  });

  // Get all assets
  fastify.get('/assets', async (request, reply) => {
    try {
      const assets = await fastify.prisma.asset.findMany();
      return assets;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error fetching assets');
    }
  });

  // Get a single asset by id
  fastify.get('/assets/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const asset = await fastify.prisma.asset.findUnique({
        where: { id },
      });
      if (!asset) {
        reply.code(404).send('Asset not found');
      }
      return asset;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error fetching asset');
    }
  });

  // Update an asset
  fastify.put('/assets/:id', async (request, reply) => {
    const { id } = request.params;
    const { symbol, name, assetType } = request.body;
    try {
      const asset = await fastify.prisma.asset.update({
        where: { id },
        data: {
          symbol,
          name,
          assetType,
        },
      });
      return asset;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error updating asset');
    }
  });

  // Delete an asset
  fastify.delete('/assets/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      await fastify.prisma.asset.delete({
        where: { id },
      });
      reply.code(204).send();
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send('Error deleting asset');
    }
  });
}

module.exports = assetRoutes;
