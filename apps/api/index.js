const fastify = require('fastify')({ logger: true });

// Register plugins
fastify.register(require('./plugins/prisma'));

// Register routes
fastify.register(require('./routes/assets'));
fastify.register(require('./routes/holdings'));
fastify.register(require('./routes/holdingMovements'));
fastify.register(require('./routes/investments'));
fastify.register(require('./routes/investmentTransactions'));
fastify.register(require('./routes/investmentClosures'));

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();