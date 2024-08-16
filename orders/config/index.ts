export default {
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASS as string,
  database: process.env.POSTGRES_DB as string,
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string) as number,
  dialect: "postgres",
};
