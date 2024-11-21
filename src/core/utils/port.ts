import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Normalize a port into a number, string, or false.
 * @param {int} val The port number.
 * @returns {int} The port number.
 */
const normalizePort = (val: string): number | boolean => {
  const port: number = parseInt(val, 10);

  if (port >= 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || '4043');

export default port;
