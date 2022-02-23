import { createConnection } from 'typeorm';
import ORMConfing from './ormconfig';

const DBConnect = async () => {
  try {
    await createConnection(ORMConfing);
    console.log('🌴 Database connection was successful!');
  } catch (error) {
    console.error('ERROR: Database connection failed!!', error.message);
    throw error;
  }
};

export default DBConnect;
