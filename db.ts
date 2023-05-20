import { Pool } from "pg";
import * as config from "./db.config";
import * as fs from "fs/promises";

/** Соединение с базой */
export const pool = new Pool(config);

/** Инициализация базы */
export async function initDb() {
  console.log("Starting db init");
  const initQuery = await fs.readFile("./sql/init.sql", "utf8");
  await pool.query(initQuery);
  console.log("Db init success! :)");
}
