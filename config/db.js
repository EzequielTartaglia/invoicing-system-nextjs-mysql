import { createPool } from "mysql2/promise";

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "starcraft",
  port: 3306,
  database: "invoicing_system_db",
});

export { pool };
