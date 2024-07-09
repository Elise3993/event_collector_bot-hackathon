// データベース接続
import mysql from "mysql2";

export default function createDB() {
  // データベース接続設定
  const connection = mysql.createConnection({
    host: "discord_db_container", // Docker Composeで設定したコンテナ名
    user: "user", // 環境変数 MYSQL_USER の値
    password: "password", // 環境変数 MYSQL_PASSWORD の値
    database: "app", // 環境変数 MYSQL_DATABASE の値
  });

  // データベースに接続
  connection.connect((err) => {
    if (err) {
      return console.error("エラー: " + err.message);
    }
    console.log("MySQLデータベースに接続しました。");
  });

  // テーブルを作成する
  const query = `CREATE TABLE my_table (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), age INT)`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log("テーブル作成成功:", results);
  });
  
  // 接続を閉じる
  connection.end();
}
