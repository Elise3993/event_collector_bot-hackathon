import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // 許可するオリジン
  methods: "GET", // 許可するHTTPメソッド
  optionsSuccessStatus: 204, // 一部の古いブラウザ向けのレスポンスステータス
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api/v1/all_events", (req, res) => {
  console.log("GET /api/v1/all_events");
  res.json([
    {
      title: "イベント1",
      start_date: "2023-04-01T18:00:00.000+09:00",
      end_date: "2023-04-02T02:00:00.000+09:00",
      description: "これはイベント1の説明です。",
      place: "東京",
      server_name: "サーバーA",
    },
    {
      title: "イベント2",
      start_date: "2023-04-02T19:00:00.000+09:00",
      end_date: "2023-04-03T00:00:00.000+09:00",
      description: null,
      place: null,
      server_name: "サーバーB",
    },
    {
      title: "イベント3",
      start_date: "2023-04-03T20:00:00.000+09:00",
      end_date: "2023-04-04T01:00:00.000+09:00",
      description: "これはイベント3の説明です。",
      place: "大阪",
      server_name: "サーバーC",
    },
  ]);
});

export default app;
