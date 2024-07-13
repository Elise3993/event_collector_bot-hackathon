import { setupDataBaseConnection } from "./db.mjs";

export function createEventDataTable() {
  const connection = setupDataBaseConnection();

  // データを格納する
  // テーブルを作成する
  const query = `CREATE TABLE IF NOT EXISTS discord_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    title VARCHAR(255),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    place VARCHAR(255),
    description TEXT,
    author VARCHAR(255),
    server_name VARCHAR(255)
  )`;

  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log("テーブル作成成功:", results);
  });
  connection.end();
}

export function insertEventData(data) {
  const connection = setupDataBaseConnection();
  const query = `INSERT INTO discord_events (title, start_date, end_date, place, description, author, server_name) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  connection.query(
    query,
    [data.title, data.start_date, data.end_date, data.place, data.description, data.author, data.server_name],
    (err, results) => {
      if (err) throw err;
      console.log("データ挿入成功:", results);
    },
  );
  connection.end();
}

export function fetchAllEventData() {
  const connection = setupDataBaseConnection();
  const query = `SELECT * FROM discord_events`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log("データ取得成功:", results);
  });
  connection.end();
}

export function deleteEventDataById(id) {
  const connection = setupDataBaseConnection();
  const query = `DELETE FROM discord_events WHERE id = ?`;
  connection.query(query, [id], (err, results) => {
    if (err) throw err;
    console.log("データ削除成功:", results);
  });
  connection.end();
}

/**
 * SQLクエリを実行する関数
 * DBに対して上記にない処理を実行したい際、即席でSQL書いて使用してください
 * @param {string} query - 実行するSQLクエリ
 * @param {Array} params - SQLクエリのパラメータ
 * @returns {Promise} - クエリ実行結果を返すPromise
 */
export function executeQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const connection = setupDataBaseConnection();
    connection.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
