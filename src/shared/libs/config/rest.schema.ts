import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormat(validator.ipaddress);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections.',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
  SALT: {
    doc: 'Salt for hashing passwords.',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB).',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  }
});
