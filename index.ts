//импорт нужных мне фреймворков (или просто важных штук) ,
//дотенв для окр.пер.  экспресс для веб, патх - путь

import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import { pool, initDb } from "./db";

async function main() {
  console.log("Hello! Server starting uwu");
  // Вызываем инициализацию базы
  await initDb();

  //const dbcon = require('dbcontroller'); //импорт контроллера бд
  const { json } = require("body-parser"); //чтобы был жсон

  //const { Pool } = pg //подключение постгрес и переменная пула????

  const port = process.env.PORT || 8080;

  //config will read your .env file, parse the contents, assign it to process.env, and return an Object with a parsed key containing the loaded content or an error key if it failed.
  //то есть конфиг читает моий файл где пер.окружения, парс контент и еще что-то куча
  dotenv.config();

  //создать объект экспресс чтобы с ним работать (создаем объект приложения)
  const app: Express = express();

  //Встроенный посредник, разбирающий входящие запросы в объект в формате JSON. основан на body-parser.
  //переводит данные в формат жсон
  app.use(express.json());
  app.use(cors());

  //запрос в постгресгл
  app.get("/", async (req, res) => {
    try {
      const z1 = await pool.query(`SELECT * FROM users`);
      res.json(z1.rows);
    } catch (err) {
      console.error(err + " ошибка");
    }
  });

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World From the Typescript Server!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  interface FormInputs {
    email: string;
    password: string;
  }

  // Array of example users for testing purposes
  const users = [
    {
      id: 1,
      name: "Maria Doe",
      email: "maria@example.com",
      password: "maria123",
    },
    {
      id: 2,
      name: "Juan Doe",
      email: "juan@example.com",
      password: "juan123",
    },
  ];

  // route login
  app.post("/login", (req: Request, res: Response) => {
    const { email, password }: FormInputs = req.body;

    const user = users.find((user) => {
      return user.email === email && user.password === password;
    });

    if (!user) {
      return res.status(404).send("User Not Found!");
    }

    return res.status(200).json(user);
  });
}

main();
