import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorlogger, logger } from './shared/logger';

process.on('uncaughtException', (error) => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  await mongoose.connect(config.database_url as string);
  logger.info(`Database is connected successfully!`);

  server = app.listen(config.port, () => {
    logger.info(`Server is running on http://localhost:${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    errorlogger.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();
