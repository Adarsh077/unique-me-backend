/* eslint-disable no-console */
// process.stdout.write('\x1Bc');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

import app from './app';
import config from './config';

const port = config.PORT;
const server = app.listen(port, () => {
  console.log(`🔥 App running on port ${port}...`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
