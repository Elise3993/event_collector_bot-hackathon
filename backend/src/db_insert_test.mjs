// データベース接続
import mysql from "mysql2";

export default function insertDB() {
  // データベース接続設定
  const connection = mysql.createConnection({
    host: "db_container", // Docker Composeで設定したコンテナ名
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

  // データを格納する
  const query = `INSERT INTO my_table (name, age) VALUES (?, ?)`;
  connection.query(query, ["devcontainer_testhoge", 33], (err, results) => {
    if (err) throw err;
    console.log("データ挿入成功:", results);
  });

  // 接続を閉じる
  connection.end();
}
