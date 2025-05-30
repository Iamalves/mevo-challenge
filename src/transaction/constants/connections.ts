export const MONGO_CONNECTION =
  process.env.MONGO_HOST ||
  'mongodb://root:root@localhost:29017/nest?authSource=admin';
