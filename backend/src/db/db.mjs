import dotenv from "dotenv";
import mysql from "mysql2";

const mysqlConfig = {
  host: process.env.MYSQL_CONTAINER_NAME,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

export function setupDataBaseConnection() {
  dotenv.config();

  // データベース接続設定
  const connection = mysql.createConnection(mysqlConfig);

  // データベースに接続
  connection.connect((err) => {
    if (err) {
      return console.error("エラー: " + err.message);
    }
    console.log("MySQLデータベースに接続しました。");
  });
}
