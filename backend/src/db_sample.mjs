// 各関数の使用例
// 同期処理・非同期処理の考慮ほとんど出来てないので使うときに整えてください

// import { createEventDataTable,insertEventData,fetchAllEventData,deleteEventDataById,executeQuery } from "./db/events.mjs";

// テーブル作成
// createEventDataTable();

// データ挿入
// insertEventData({
//   title: "テストイベント",
//   start_date: "2023-04-02T19:00:00.000+09:00",
//   end_date: "2023-04-03T00:00:00.000+09:00",
//   place: "東京",
//   description: "適当",
//   author: "えりーず",
//   server_name: "IT班",
// });

// insertEventData({
//   title: "Test Event",
//   start_date: "2023-04-02T19:00:00.000+09:00",
//   end_date: "2023-04-03T00:00:00.000+09:00",
//   place: "Tokyo",
//   description: "Sample",
//   author: "Elise",
//   server_name: "IT group",
// });

// データ取得
// console.log(fetchAllEventData());

// データ削除
// deleteEventDataById(5);

// 任意のSQLクエリ実行
// executeQuery("SELECT id FROM discord_events").then((results) => console.log(results));
