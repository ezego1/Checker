import { AddressInfo } from 'net';
import app from './app';

let PORT = parseInt(process.env.PORT!, 10);
if (Number.isNaN(PORT) || PORT === 0) {
  PORT = 5000;
}

const server = app.listen(PORT, '0.0.0.0', () => {
  const { port, address } = server.address() as AddressInfo;
  console.log('Server listening on:', `http://${address}:${port}`);
});
