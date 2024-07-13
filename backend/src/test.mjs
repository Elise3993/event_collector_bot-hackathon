// データベース接続
import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

// データベース接続設定
const connection = mysql.createConnection({
  host: process.env.MYSQL_CONTAINER_NAME, // 環境変数 MYSQL_CONTAINER_NAME の値
  user: process.env.MYSQL_USER, // 環境変数 MYSQL_USER の値
  password: process.env.MYSQL_PASSWORD, // 環境変数 MYSQL_PASSWORD の値
  database: process.env.MYSQL_DATABASE, // 環境変数 MYSQL_DATABASE の値
});

// データベースに接続
connection.connect((err) => {
  if (err) {
    return console.error("エラー: " + err.message);
  }
  console.log("MySQLデータベースに接続しました。");
});

// 接続を閉じる
connection.end();
