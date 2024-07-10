// Nodeの動作テスト
// discordの機能入れて勝手に変更していいよ
import http from "http";
import url from "url";
import createDB from "./db_create_test.mjs";
import insertDB from "./db_insert_test.mjs";

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;

  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!\n");
    console.log("ok");
  } else if (pathname === "/create_table") {
    createDB();

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("created table!\n");
  } else if (pathname === "/insert_data") {
    insertDB();

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("inserted data!\n");
  }
});

server.listen(4000, () => {
  console.log("Server running at http://localhost:4000/");
});
